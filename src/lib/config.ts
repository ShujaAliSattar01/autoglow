// Central business configuration.
// Update these values to change contact details, hours, and service area sitewide.

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://autoglow-lahore.netlify.app";

export const businessConfig = {
  name: "AutoGlow",
  tagline: "Premium Car Care. At Your Doorstep.",
  /** Short summary of everything AutoGlow offers, used in metadata. */
  servicesSummary:
    "mobile car wash and detailing, solar panel cleaning and sofa cleaning",
  contactEmail: "shujaalisattar@gmail.com",
  serviceArea: "Lahore",
  hours: "9:00 AM – 9:00 PM, 7 days a week",
};
