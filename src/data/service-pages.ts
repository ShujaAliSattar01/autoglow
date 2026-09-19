export interface ServicePageFaq {
  question: string;
  answer: string;
}

export interface ServicePageContent {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  included: string[];
  whyTitle: string;
  why: { title: string; description: string }[];
  startingPrice: string;
  faqs: ServicePageFaq[];
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
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
