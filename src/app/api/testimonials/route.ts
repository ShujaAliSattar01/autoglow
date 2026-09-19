import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";
import { seedTestimonials } from "@/data/testimonials-seed";
import {
  reviewSchema,
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
} from "@/lib/validation";
import { isRateLimited, getClientKey } from "@/lib/rate-limit";
import type { Testimonial } from "@/types";

export const runtime = "nodejs";

export async function GET() {
  if (!isSupabaseAdminConfigured) {
    return NextResponse.json({ testimonials: seedTestimonials, source: "seed" });
  }

  const admin = getSupabaseAdmin();
  const { data, error } = await admin!
    .from("testimonials")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[testimonials] Failed to fetch from Supabase:", error.message);
    return NextResponse.json({ testimonials: seedTestimonials, source: "seed" });
  }

  const testimonials = (data as Testimonial[] | null) ?? [];
  return NextResponse.json({
    testimonials: testimonials.length > 0 ? testimonials : seedTestimonials,
    source: testimonials.length > 0 ? "supabase" : "seed",
  });
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (isRateLimited(`review:${clientKey}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  if (!isSupabaseAdminConfigured) {
    return NextResponse.json(
      {
        error:
          "Reviews are not yet configured on the server. Please add Supabase credentials to enable submissions.",
      },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const raw = {
    name: String(formData.get("name") ?? ""),
    vehicle: String(formData.get("vehicle") ?? ""),
    area: String(formData.get("area") ?? ""),
    rating: Number(formData.get("rating") ?? 0),
    review: String(formData.get("review") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = reviewSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? "Invalid submission." },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    // Honeypot tripped -- silently reject without revealing the mechanism.
    return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
  }

  const admin = getSupabaseAdmin()!;
  let imageUrl: string | null = null;

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    if (!ACCEPTED_IMAGE_TYPES.includes(imageFile.type)) {
      return NextResponse.json(
        { error: "Image must be a JPG, PNG or WEBP file." },
        { status: 400 }
      );
    }
    if (imageFile.size > MAX_IMAGE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Image must be smaller than 4MB." },
        { status: 400 }
      );
    }

    const extension = imageFile.type.split("/")[1] ?? "jpg";
    const fileName = `${randomUUID()}.${extension}`;
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    const { error: uploadError } = await admin.storage
      .from("testimonial-images")
      .upload(fileName, buffer, { contentType: imageFile.type, upsert: false });

    if (uploadError) {
      console.error("[testimonials] Image upload failed:", uploadError.message);
      return NextResponse.json(
        { error: "Failed to upload image. Please try again." },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = admin.storage
      .from("testimonial-images")
      .getPublicUrl(fileName);
    imageUrl = publicUrlData.publicUrl;
  }

  const { data: inserted, error: insertError } = await admin
    .from("testimonials")
    .insert({
      name: parsed.data.name,
      vehicle: parsed.data.vehicle || null,
      area: parsed.data.area || null,
      rating: parsed.data.rating,
      review: parsed.data.review,
      image_url: imageUrl,
      status: "approved",
    })
    .select("*")
    .single();

  if (insertError) {
    console.error("[testimonials] Failed to insert review:", insertError.message);
    return NextResponse.json(
      { error: "Failed to save your review. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ testimonial: inserted as Testimonial }, { status: 201 });
}
