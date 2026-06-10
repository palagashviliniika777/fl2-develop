export type ServiceNavItem = {
  name: string;
  slug: string;
};

export type ThicknessOption = {
  label: string;
  description: string | null;
  price: number;
};

export type ServiceCalculatorItem = {
  name: string;
  slug: string;
  featuredImage: string | null;
  pricePerSqm: number | null;
  thicknessOptions: ThicknessOption[] | null;
};

export type ServiceListItem = {
  name: string;
  slug: string;
  shortDescription: string | null;
  featuredImage: string | null;
};

export type ServiceDescriptionBlock = {
  text: string | null;
  images: string[] | null;
};

export type ServiceDetail = {
  name: string | null;
  slug: string;
  featuredImage: string | null;
  pricePerSqm: number | null;
  descriptionBlocks: ServiceDescriptionBlock[];
};
