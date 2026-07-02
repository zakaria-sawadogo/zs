import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import { Badge } from "@/components/design/badge";
import laboratory from "@/data/laboratory.json";
import gallery from "@/data/gallery.json";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";

export const metadata = { title: "Laboratory" };

export default function LaboratoryPage() {
  return (
    <Section>
      <Heading eyebrow="Laboratory" title={laboratory.name} text={laboratory.mission} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-bold">Vision</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">{laboratory.vision}</p>
          <div className="mt-5 flex flex-wrap gap-2">{laboratory.axes.map((axis) => <Badge key={axis}>{axis}</Badge>)}</div>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold">Equipment & partners</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">{laboratory.equipment.join(", ")}</p>
          <p className="mt-3 leading-7 text-[var(--muted)]">{laboratory.partners.join(", ")}</p>
        </Card>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {gallery.map((item) => (
          <Card key={item.title}>
            <Image src={withBasePath(item.image)} alt="" width={480} height={320} className="mb-4 aspect-[4/3] w-full rounded-md object-cover" />
            <h3 className="font-bold">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{item.caption}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <h2 className="text-2xl font-bold">Join the laboratory</h2>
        <p className="mt-3 leading-7 text-[var(--muted)]">{laboratory.join}</p>
      </Card>
    </Section>
  );
}
