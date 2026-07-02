import { Download } from "lucide-react";
import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import { Button } from "@/components/design/button";
import profile from "@/data/profile.json";
import courses from "@/data/courses.json";

export const metadata = { title: "Downloads" };

export default function DownloadsPage() {
  const files = [profile.cvUrl, ...courses.flatMap((course) => course.materials)];
  return (
    <Section>
      <Heading eyebrow="Downloads" title="Resources and academic documents" />
      <div className="grid gap-4 md:grid-cols-2">
        {files.map((file) => (
          <Card key={file} className="flex items-center justify-between gap-4">
            <span className="break-all text-sm font-semibold">{file.replace("/downloads/", "")}</span>
            <Button href={file} variant="secondary"><Download size={16} /> Download</Button>
          </Card>
        ))}
      </div>
    </Section>
  );
}
