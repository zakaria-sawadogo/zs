import profile from "@/data/profile.json";
import experience from "@/data/experience.json";
import education from "@/data/education.json";
import awards from "@/data/awards.json";
import research from "@/data/research.json";
import publications from "@/data/publications.json";
import projects from "@/data/projects.json";
import courses from "@/data/courses.json";
import laboratory from "@/data/laboratory.json";
import students from "@/data/students.json";
import grants from "@/data/grants.json";
import talks from "@/data/talks.json";
import gallery from "@/data/gallery.json";
import social from "@/data/social.json";
import settings from "@/data/settings.json";

export const siteData = {
  profile,
  experience,
  education,
  awards,
  research,
  publications,
  projects,
  courses,
  laboratory,
  students,
  grants,
  talks,
  gallery,
  social,
  settings
};

export type DataKey = keyof typeof siteData;
