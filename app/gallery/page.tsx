import Image from "next/image";
import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import gallery from "@/data/gallery.json";
import { withBasePath } from "@/lib/paths";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <Section>
      <Heading eyebrow="Gallery" title="Research life, seminars, and workshops" />
      <div className="grid gap-5 md:grid-cols-3">
        {gallery.map((item) => (
          <Card key={item.title}>
            <Image src={withBasePath(item.image)} alt={item.title} width={640} height={420} className="mb-4 aspect-[4/3] w-full rounded-md object-cover" />
            <h2 className="font-bold">{item.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{item.caption}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
