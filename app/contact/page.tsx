import { Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/design/section";
import { Heading } from "@/components/design/heading";
import { Card } from "@/components/design/card";
import { Button } from "@/components/design/button";
import profile from "@/data/profile.json";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Section>
      <Heading eyebrow="Contact" title="Collaborations, supervision, and speaking invitations" />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <div className="space-y-4 text-[var(--muted)]">
            <p className="flex items-center gap-3"><Mail size={18} /> {profile.email}</p>
            <p className="flex items-center gap-3"><Phone size={18} /> {profile.phone}</p>
            <p className="flex items-center gap-3"><MapPin size={18} /> {profile.location}</p>
          </div>
          <div className="mt-6 aspect-square rounded-lg border border-[var(--line)] bg-[linear-gradient(45deg,#0f766e,#1f2937,#b45309)] p-6 text-white">
            <div className="grid h-full place-items-center rounded-md border border-white/35 text-center text-sm font-bold">QR CONTACT</div>
          </div>
        </Card>
        <Card>
          <form className="grid gap-4">
            <input className="rounded-md border border-[var(--line)] bg-transparent px-4 py-3" placeholder="Name" />
            <input className="rounded-md border border-[var(--line)] bg-transparent px-4 py-3" placeholder="Email" />
            <textarea className="min-h-40 rounded-md border border-[var(--line)] bg-transparent px-4 py-3" placeholder="Message" />
            <Button type="submit">Send message</Button>
          </form>
        </Card>
      </div>
    </Section>
  );
}
