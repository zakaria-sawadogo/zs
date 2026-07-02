import Image from "next/image";

export function Avatar({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={96} height={96} className="size-24 rounded-full object-cover ring-4 ring-white/60" />;
}
