import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
export default function ProductCard({
  name,
  price,
  image,
  slug,
}: {
  name: string;
  price: number;
  image: string;
  slug: string;
}) {
  return (
    <Link
      href={"/product/" + slug}
      className="rounded-lg overflow-hidden border border-gray-200 shadow-md flex flex-col"
    >
      <div className="p-4 flex-1 flex flex-col">
        <div className="relative h-32 w-full mb-4">
          <Image src={image || ""} alt={name} fill className="object-contain" />
        </div>
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-gray-800">
            Rp. {price.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </Link>
  );
}
