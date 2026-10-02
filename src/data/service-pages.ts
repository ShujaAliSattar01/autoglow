import type { ServiceCategoryId } from "@/types";

export interface ServicePageFaq {
  question: string;
  answer: string;
}

export interface ServicePageBlock {
  title: string;
  description: string;
}

export interface ServicePageContent {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  included: string[];
  whyTitle: string;
  why: ServicePageBlock[];
  startingPrice: string;
  faqs: ServicePageFaq[];

  // ---------------------------------------------------------------------
  // Optional sections. The four original car pages leave these undefined and
  // render exactly as they always have; the solar and sofa pages use them.
  // ---------------------------------------------------------------------

  /** Set on pages that show flat-rate package cards and category structured data. */
  category?: Extract<ServiceCategoryId, "solar" | "sofa">;
  /** Hero image for the page. */
  image?: string;
  imageAlt?: string;
  /** Heading above the "What's Included" list, when the default does not fit. */
  includedTitle?: string;
  /** Heading above the pricing cards. */
  packagesTitle?: string;
  packagesIntro?: string;
  /** "How booking works" steps. */
  howItWorksTitle?: string;
  howItWorks?: ServicePageBlock[];
  /** Service-area copy for Lahore. */
  serviceAreaTitle?: string;
  serviceArea?: string[];
  /** Internal links to the homepage and related services. */
  relatedTitle?: string;
  related?: { label: string; href: string; description: string }[];
}

export const servicePages: ServicePageContent[] = [
  {
    slug: "car-wash-lahore",
    title: "Mobile Car Wash in Lahore | AutoGlow",
    metaDescription:
      "Looking for a car wash at home in Lahore? AutoGlow brings a full exterior wash and vacuum to your doorstep, with no queues and no waiting rooms.",
    h1: "Mobile Car Wash in Lahore",
    intro: [
      "Finding a reliable car wash in Lahore usually means driving across town, waiting in line, and hoping the job is done properly. AutoGlow removes all of that by bringing a professional exterior wash directly to your home or office, anywhere in Lahore.",
      "Our mobile car wash team arrives with their own water supply, foam cannon, microfiber towels and vacuum equipment, so a car wash at home in Lahore is just as thorough as a trip to a workshop — without the drive.",
    ],
    included: [
      "Exterior foam wash to safely lift dirt and road grime",
      "Wheels, rims and tyre cleaning",
      "Tyre shine finish",
      "Exterior glass cleaning",
      "Interior vacuum of seats, mats and boot",
      "Dashboard wipe-down",
      "Door jamb wipe",
      "Final microfiber hand dry for a streak-free finish",
    ],
    startingPrice: "Rs 1,799",
    whyTitle: "Why Book a Mobile Car Wash With AutoGlow",
    why: [
      {
        title: "Genuinely Doorstep",
        description:
          "No need to leave your home or office — our team brings everything needed for a complete wash to your driveway or parking spot.",
      },
      {
        title: "Safe for Your Paint",
        description:
          "We use a two-bucket foam wash method and clean microfiber towels to avoid swirl marks that cheap roadside washes often cause.",
      },
      {
        title: "Fast Turnaround",
        description:
          "A standard exterior wash takes around 45 minutes, so you can get your car cleaned during a work call or while running errands at home.",
      },
    ],
    faqs: [
      {
        question: "How is a mobile car wash different from a regular car wash in Lahore?",
        answer:
          "A mobile car wash comes to your location with its own equipment and water supply, so you get a full exterior wash without driving anywhere or waiting in a queue.",
      },
      {
        question: "Do I need to provide water for the wash?",
        answer:
          "Our team arrives self-sufficient with the water needed for most washes. If your location has specific access restrictions, let us know when booking.",
      },
      {
        question: "Can I upgrade to wax or interior detailing later?",
        answer:
          "Yes. You can add services like body wax, interior deep cleaning or ceramic protection either at the time of booking or during a future visit.",
      },
    ],
  },
  {
    slug: "car-detailing-lahore",
    title: "Car Detailing in Lahore | Complete Detail Service | AutoGlow",
    metaDescription:
      "AutoGlow offers complete car detailing in Lahore at your doorstep — deep interior cleaning, exterior polish and paint protection, done at your home or office.",
    h1: "Car Detailing in Lahore",
    intro: [
      "Car detailing goes well beyond a standard wash — it's a deep, methodical clean and restoration of both the interior and exterior of your vehicle. AutoGlow's mobile car detailing service in Lahore brings this full treatment directly to your doorstep.",
      "Whether your car needs a seasonal refresh or hasn't been properly detailed in months, our trained detailers work through every panel, seat and surface using the right products and tools for the job — no shortcuts, no rushed work.",
    ],
    included: [
      "Deep exterior foam wash and decontamination",
      "Complete interior deep cleaning",
      "Seat cleaning and shampoo",
      "Carpet and mat shampoo",
      "Dashboard and trim restoration",
      "Engine bay cleaning",
      "Machine polish for paint clarity",
      "Wax or paint protection layer",
      "Wheel and tyre restoration",
      "Door jamb and boot cleaning",
    ],
    startingPrice: "Rs 5,999",
    whyTitle: "Why Choose AutoGlow for Car Detailing",
    why: [
      {
        title: "Trained Detailers",
        description:
          "Every technician follows a consistent process for interior and exterior detailing, so results don't depend on luck or who happens to be on shift.",
      },
      {
        title: "Complete, Not Partial",
        description:
          "Our detailing package covers interior, exterior, engine bay and wheels in a single appointment — not just a quick exterior pass.",
      },
      {
        title: "Doorstep Convenience",
        description:
          "A full detail normally means leaving your car at a workshop for hours. We do the work at your home or office instead.",
      },
    ],
    faqs: [
      {
        question: "How long does a full car detailing session take?",
        answer:
          "Complete Detailing typically takes 2–3 hours, depending on your vehicle's size and current condition.",
      },
      {
        question: "Is car detailing different from ceramic coating?",
        answer:
          "Detailing is a deep clean and polish of your car's interior and exterior. Ceramic coating is an additional, longer-lasting protective layer applied after the paint is properly prepared — see our ceramic coating service for details.",
      },
      {
        question: "What if my car is unusually dirty or hasn't been cleaned in a long time?",
        answer:
          "Vehicles that need significant extra work may incur a small additional charge, which our team will always confirm with you before starting.",
      },
    ],
  },
  {
    slug: "interior-cleaning-lahore",
    title: "Interior Car Cleaning in Lahore | AutoGlow",
    metaDescription:
      "Professional interior car cleaning in Lahore at your doorstep. AutoGlow deep-cleans seats, carpets, dashboards and door panels for a fresh, spotless cabin.",
    h1: "Interior Car Cleaning in Lahore",
    intro: [
      "Your car's interior takes a daily beating — dust, spills, crumbs and general wear build up faster than most people realise. AutoGlow's interior car cleaning service in Lahore focuses entirely on restoring your cabin to a fresh, spotless condition.",
      "We bring proper vacuum equipment, upholstery cleaners and detailing brushes to your home or office, so every seat, vent and corner gets properly addressed — not just a quick wipe-down.",
    ],
    included: [
      "Full interior vacuum, including seats, mats and boot",
      "Seat cleaning and shampoo for fabric and leather",
      "Carpet and floor mat shampoo",
      "Dashboard and trim wipe-down",
      "Door panel and door jamb cleaning",
      "Cup holders, vents and console detailing",
      "Interior glass cleaning",
      "Optional odour treatment for a fresher cabin",
    ],
    startingPrice: "Rs 999",
    whyTitle: "Why Book Interior Cleaning With AutoGlow",
    why: [
      {
        title: "Detail-Focused",
        description:
          "We clean the spots that get missed in a quick vacuum — seat seams, door pockets, vents and the underside of mats.",
      },
      {
        title: "Fabric and Leather Safe",
        description:
          "Our products and techniques are chosen based on your seat material, so cleaning doesn't damage or discolour upholstery.",
      },
      {
        title: "Quick Appointment Slots",
        description:
          "A standalone interior clean is one of our fastest services, making it easy to fit into a busy day at home or the office.",
      },
    ],
    faqs: [
      {
        question: "Can you remove stains from seats and carpets?",
        answer:
          "Most everyday stains lift well with our seat and carpet shampoo process. Heavily set-in or old stains may improve significantly but aren't always guaranteed to fully disappear.",
      },
      {
        question: "Do you clean leather and fabric seats differently?",
        answer:
          "Yes. We use appropriate products for leather versus fabric upholstery to avoid damage or discolouration.",
      },
      {
        question: "How long does interior cleaning take?",
        answer:
          "A standalone interior clean generally takes around 45 minutes to an hour, depending on your vehicle's size and condition.",
      },
    ],
  },
  {
    slug: "ceramic-coating-lahore",
    title: "Ceramic Coating in Lahore | Paint Protection | AutoGlow",
    metaDescription:
      "AutoGlow applies professional ceramic coating in Lahore at your doorstep — paint decontamination, machine polishing and a hydrophobic protective layer.",
    h1: "Ceramic Coating in Lahore",
    intro: [
      "Ceramic coating is one of the most effective ways to protect your car's paint and keep it looking freshly detailed for longer. AutoGlow's ceramic coating service in Lahore is carried out at your home or office, with the same careful preparation you'd expect from a dedicated detailing studio.",
      "Because a coating is only as good as the surface underneath it, we don't skip the preparation stage — every vehicle is washed, decontaminated and machine polished before the ceramic layer is applied.",
    ],
    included: [
      "Complete exterior preparation and inspection",
      "Deep exterior wash",
      "Paint decontamination to remove embedded contaminants",
      "Machine polishing to refine the paint surface",
      "Ceramic coating application",
      "Hydrophobic paint protection layer",
      "Enhanced gloss and depth finish",
      "Wheel and exterior trim finishing",
      "Final coating inspection",
    ],
    startingPrice: "Rs 14,999",
    whyTitle: "Why Choose AutoGlow for Ceramic Coating",
    why: [
      {
        title: "Proper Paint Prep",
        description:
          "We decontaminate and machine polish before coating, so the ceramic layer bonds to clean, refined paint instead of trapping dirt and swirl marks underneath.",
      },
      {
        title: "Hydrophobic Finish",
        description:
          "A properly applied ceramic coating causes water to bead and roll off the paint, making everyday maintenance washes faster and easier.",
      },
      {
        title: "Done At Your Location",
        description:
          "You don't need to drop your car off for a day — our team completes the full preparation and coating process at your home or office.",
      },
    ],
    faqs: [
      {
        question: "How long does a ceramic coating appointment take?",
        answer:
          "Ceramic Protection typically takes around 4–5 hours, since it involves full paint preparation, machine polishing and the coating application itself.",
      },
      {
        question: "Does ceramic coating replace regular car washes?",
        answer:
          "No. A ceramic coating protects and enhances your paint, but your car will still need regular washing — it just becomes faster and easier since dirt and water bead off more readily.",
      },
      {
        question: "Will ceramic coating hide scratches or swirl marks?",
        answer:
          "The machine polishing stage before coating reduces light swirl marks, but a ceramic coating itself is a protective layer, not a substitute for paint correction of deeper scratches.",
      },
    ],
  },
  {
    slug: "solar-panel-cleaning-lahore",
    category: "solar",
    title: "Solar Panel Cleaning in Lahore",
    metaDescription:
      "Book doorstep solar panel cleaning in Lahore with AutoGlow. Gentle, panel-appropriate cleaning of dust and ordinary dirt, priced by panel count from Rs 2,000.",
    h1: "Solar Panel Cleaning in Lahore",
    image: "/images/solar-panel-cleaning.webp",
    imageAlt:
      "Rooftop solar panels being cleaned with a soft brush during an AutoGlow visit in Lahore",
    intro: [
      "Rooftop solar panels in Lahore collect dust quickly, especially through the dry months and after nearby construction work. AutoGlow now offers solar panel cleaning as a doorstep service, using the same careful, equipment-led approach we built our car detailing service on.",
      "Our team cleans the panel surfaces gently to remove dust and ordinary dirt, then carries out a basic visual check of the panels while we work. Pricing is based on how many panels you have, so you know the starting rate before we arrive.",
    ],
    packagesTitle: "Solar Panel Cleaning Packages",
    packagesIntro:
      "Choose the package that matches the number of panels on your roof. Every price below is a starting rate, confirmed with you before work begins.",
    includedTitle: "What a Solar Panel Clean Covers",
    included: [
      "Gentle, panel-appropriate surface cleaning",
      "Removal of surface dust and ordinary dirt",
      "Removal of light deposits from the panel surface",
      "Basic visual condition check while we work",
      "Final surface inspection before we leave",
      "A clear starting price based on your panel count",
    ],
    startingPrice: "Rs 2,000",
    whyTitle: "Why Book Solar Panel Cleaning With AutoGlow",
    why: [
      {
        title: "Priced by Panel Count",
        description:
          "You pick the package that matches your array size, so the starting price is clear before anyone comes to your roof.",
      },
      {
        title: "Gentle on the Panels",
        description:
          "We clean panel surfaces using methods appropriate for solar glass. We do not carry out electrical work or repairs.",
      },
      {
        title: "Access Confirmed First",
        description:
          "We ask about roof and access details at booking, and confirm that the job can be carried out safely before it is scheduled.",
      },
    ],
    howItWorksTitle: "How Booking Works",
    howItWorks: [
      {
        title: "1. Tell us your panel count",
        description:
          "Pick a package, or message us on WhatsApp if you have more than 30 panels and need a custom quotation.",
      },
      {
        title: "2. Share roof and access details",
        description:
          "Let us know how the panels are reached — storey height, stairs, ladder access or any restrictions at your property.",
      },
      {
        title: "3. We confirm the booking",
        description:
          "We confirm safe access, service eligibility and the final price with you before the appointment is fixed.",
      },
      {
        title: "4. We clean at your doorstep",
        description:
          "Our team arrives at the agreed time, cleans the panels and carries out a final surface inspection.",
      },
    ],
    serviceAreaTitle: "Service Area in Lahore",
    serviceArea: [
      "AutoGlow covers homes and offices across Lahore for solar panel cleaning. Enter your address and area when booking and we will confirm coverage and timing for your location.",
      "Travel to some outlying areas may affect scheduling, which we will always confirm with you before finalising the appointment.",
    ],
    relatedTitle: "Related AutoGlow Services",
    related: [
      {
        label: "Sofa Cleaning in Lahore",
        href: "/services/sofa-cleaning-lahore",
        description: "Fabric-compatible sofa cleaning at your doorstep, priced by number of seats.",
      },
      {
        label: "Mobile Car Wash in Lahore",
        href: "/services/car-wash-lahore",
        description: "Our original service — a full exterior wash and vacuum at your home or office.",
      },
      {
        label: "All AutoGlow Services",
        href: "/#services",
        description: "See every doorstep cleaning service we offer across Lahore.",
      },
    ],
    faqs: [
      {
        question: "How much does solar panel cleaning cost in Lahore?",
        answer:
          "Our packages start from Rs 2,000 for up to 10 panels, Rs 3,500 for 11–20 panels and Rs 5,000 for 21–30 panels. These are starting rates — the final price is confirmed based on roof accessibility, panel condition, quantity and location.",
      },
      {
        question: "What if I have more than 30 solar panels?",
        answer:
          "Message us on WhatsApp with your panel count and location and we will prepare a custom quotation for you.",
      },
      {
        question: "Do you need access to my roof?",
        answer:
          "Yes. Safe access to the panels is required. We ask for roof and access details at booking and confirm that the job can be carried out safely before scheduling it. We do not accept unsafe roof-access requests.",
      },
      {
        question: "Do you repair panels or carry out electrical work?",
        answer:
          "No. We clean panel surfaces only. We do not carry out repairs, electrical maintenance or any work on your solar system itself.",
      },
      {
        question: "How often should solar panels be cleaned?",
        answer:
          "It depends on how much dust your location collects. Many customers in Lahore book a clean when they can see visible dust build-up on the panel surfaces.",
      },
      {
        question: "Can I book solar panel cleaning and a car wash together?",
        answer:
          "Yes. Submit a booking for each service, or message us on WhatsApp and we will arrange the visits for you.",
      },
    ],
  },
  {
    slug: "sofa-cleaning-lahore",
    category: "sofa",
    title: "Sofa Cleaning in Lahore",
    metaDescription:
      "Book doorstep sofa cleaning in Lahore with AutoGlow. Fabric-compatible cleaning, dust and debris removal and general dirt treatment, priced by seat from Rs 500.",
    h1: "Sofa Cleaning in Lahore",
    image: "/images/sofa-cleaning.webp",
    imageAlt: "A clean fabric sofa set in a Lahore living room after an AutoGlow sofa cleaning visit",
    intro: [
      "Sofas take daily use — dust settles into the fabric, and everyday spills and marks build up over time. AutoGlow now offers sofa cleaning as a doorstep service in Lahore, carried out at your home rather than at a workshop.",
      "We remove dust and loose debris, clean the fabric using methods appropriate for the material, and treat general dirt and marks. Pricing is based on the number of seats, so you can pick the package that matches your sofa.",
    ],
    packagesTitle: "Sofa Cleaning Packages",
    packagesIntro:
      "Choose the package that matches your sofa. Every price below is a starting rate, confirmed with you before work begins.",
    includedTitle: "What a Sofa Clean Covers",
    included: [
      "Dust and loose-debris removal",
      "Fabric-compatible surface cleaning",
      "General dirt and spot treatment",
      "Attention to seams, corners and cushion gaps",
      "Finishing inspection before we leave",
      "A clear starting price based on your seat count",
    ],
    startingPrice: "Rs 500",
    whyTitle: "Why Book Sofa Cleaning With AutoGlow",
    why: [
      {
        title: "Priced by the Seat",
        description:
          "From a single seat to a full set or an eligible L-shaped sofa, you choose the package that matches what you actually have.",
      },
      {
        title: "Fabric-Appropriate Methods",
        description:
          "We check the fabric before we start and clean in a way suited to the material rather than applying the same approach to everything.",
      },
      {
        title: "Done at Your Home",
        description:
          "No need to move heavy furniture or arrange transport — our team cleans your sofa where it sits.",
      },
    ],
    howItWorksTitle: "How Booking Works",
    howItWorks: [
      {
        title: "1. Pick your package",
        description:
          "Choose a single seat, a family set of up to 5 seats, or complete care for up to 7 seats or an eligible L-shaped sofa.",
      },
      {
        title: "2. Tell us about your sofa",
        description:
          "Share the sofa type, number of seats and the fabric if you know it, so we can plan the visit properly.",
      },
      {
        title: "3. We confirm the booking",
        description:
          "We confirm the final price with you before the appointment, including any custom quotation for delicate fabrics or extra seats.",
      },
      {
        title: "4. We clean at your doorstep",
        description:
          "Our team arrives at the agreed time, cleans your sofa in place and carries out a finishing inspection.",
      },
    ],
    serviceAreaTitle: "Service Area in Lahore",
    serviceArea: [
      "AutoGlow covers homes and offices across Lahore for sofa cleaning. Enter your address and area when booking and we will confirm coverage and timing for your location.",
      "Travel to some outlying areas may affect scheduling, which we will always confirm with you before finalising the appointment.",
    ],
    relatedTitle: "Related AutoGlow Services",
    related: [
      {
        label: "Solar Panel Cleaning in Lahore",
        href: "/services/solar-panel-cleaning-lahore",
        description: "Gentle rooftop solar panel cleaning, priced by the number of panels.",
      },
      {
        label: "Interior Car Cleaning in Lahore",
        href: "/services/interior-cleaning-lahore",
        description: "Seat, carpet and cabin cleaning for your car, at your home or office.",
      },
      {
        label: "All AutoGlow Services",
        href: "/#services",
        description: "See every doorstep cleaning service we offer across Lahore.",
      },
    ],
    faqs: [
      {
        question: "How much does sofa cleaning cost in Lahore?",
        answer:
          "Our packages start from Rs 500 for a single fabric sofa seat, Rs 2,499 for up to 5 seats and Rs 3,999 for up to 7 seats or an eligible L-shaped sofa. These are starting rates confirmed before work begins.",
      },
      {
        question: "Can you remove every stain from my sofa?",
        answer:
          "We treat general dirt and stains as part of every package, but complete stain removal cannot be guaranteed. Older, set-in marks and some fabrics respond better than others.",
      },
      {
        question: "What if my sofa has a delicate fabric or more than 7 seats?",
        answer:
          "Delicate fabrics, heavy stains, oversize sofas and additional seats may require a custom quotation. Message us on WhatsApp with the details and we will quote for you.",
      },
      {
        question: "Do I need to move my sofa before you arrive?",
        answer:
          "No. We clean your sofa where it sits. Just make sure there is enough clear space around it for our team to work.",
      },
      {
        question: "How long does sofa cleaning take?",
        answer:
          "It depends on the number of seats and the condition of the fabric. Our team will give you a time estimate when the booking is confirmed.",
      },
      {
        question: "Can I book sofa cleaning along with another AutoGlow service?",
        answer:
          "Yes. Submit a booking for each service, or message us on WhatsApp and we will arrange the visits for you.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
