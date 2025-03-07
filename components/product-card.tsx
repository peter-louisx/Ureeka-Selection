import Image from "next/image";
import { Plus } from "lucide-react";
export default function ProductCard({
  name,
  price,
  image,
  unit,
}: {
  name: string;
  price: number;
  image: string;
  unit: string;
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 flex flex-col">
      <div className="p-4 flex-1 flex flex-col">
        <div className="relative h-32 w-full mb-4">
          <Image src={image || ""} alt={name} fill className="object-contain" />
        </div>
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{unit}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-gray-800">${price.toFixed(2)}</span>
          <button className="bg-white border border-green-500 rounded-full p-1 text-green-500 hover:bg-green-500 hover:text-white transition-colors">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
