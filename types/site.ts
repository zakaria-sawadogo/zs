export type Stat = {
  label: string;
  value: number;
};

export type Profile = {
  name: string;
  title: string;
  headline: string;
  institution: string;
  location: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  shortBio: string;
  stats: Stat[];
  skills: string[];
  responsibilities: string[];
  cvUrl: string;
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: string;
  doi: string;
  abstract: string;
  pdf: string;
  bibtex: string;
  code: string;
  video: string;
  citations: number;
  tags: string[];
};

export type ResearchArea = {
  area: string;
  slug: string;
  image: string;
  description: string;
  technologies: string[];
  projects: string[];
  publications: string[];
};

export type Project = {
  title: string;
  status: string;
  description: string;
  technologies: string[];
  partners: string[];
  funding: string;
  image: string;
};
