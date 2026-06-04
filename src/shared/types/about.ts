export type AboutPrinciple = {
  title: string | null;
  description: string | null;
};

export type AboutInfo = {
  heading: string | null;
  subtitle: string | null;
  body: string | null;
  principlesHeading: string | null;
  principles: AboutPrinciple[];
};

export type AboutPageData = {
  heroImages: string[];
  info: AboutInfo;
};
