export type LandingServicesSection = {
  title: string | null;
  description: string | null;
  cta: string | null;
};

export type LandingHero = {
  image: string | null;
  title: string | null;
  description: string | null;
};

export type LandingAbout = {
  title: string | null;
  description: string | null;
  cta: string | null;
  images: string[];
};

export type LandingFaqItem = {
  question: string | null;
  answer: string | null;
};

export type LandingFaq = {
  title: string | null;
  description: string | null;
  items: LandingFaqItem[];
};

export type LandingTestimonialItem = {
  quote: string | null;
  name: string | null;
  role: string | null;
  rating: number;
  image: string | null;
};

export type LandingTestimonials = {
  title: string | null;
  description: string | null;
  items: LandingTestimonialItem[];
};

export type LandingPageData = {
  hero: LandingHero;
  services: LandingServicesSection;
  about: LandingAbout;
  faq: LandingFaq;
  testimonials: LandingTestimonials;
};
