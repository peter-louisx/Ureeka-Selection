import Image from "next/image";
import ProductCard from "@/components/product-card";
import {
  ShoppingCart,
  Search,
  Plus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg mx-4 mt-4">
          <Image
            src="/hero.png"
            alt="Farmers working in field"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0  bg-opacity-30 flex flex-col justify-end p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Straight from <br />
              the Farm!
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Featured Products
          </h2>
          <button className="text-green-600 hover:text-green-700">
            <span className="sr-only">View all products</span>
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard
            name="Organic Bananas"
            price={4.99}
            image="/products/banana.png"
            unit="1 bunch"
          />
          <ProductCard
            name="Fresh Broccoli"
            price={3.0}
            image="/products/brocoli.png"
            unit="1 head"
          />
          <ProductCard
            name="Organic Lemons"
            price={2.22}
            image="/products/lime.png"
            unit="4 pieces"
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-500 text-white p-6 rounded-lg flex items-start space-x-4">
            <Truck className="h-8 w-8 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Free Shipping</h3>
              <p className="text-sm opacity-90">On orders over $50</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-lg flex items-start space-x-4">
            <Shield className="h-8 w-8 flex-shrink-0 text-gray-700" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                100% Secure Payment
              </h3>
              <p className="text-sm text-gray-600">All major cards accepted</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-lg flex items-start space-x-4">
            <RotateCcw className="h-8 w-8 flex-shrink-0 text-gray-700" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Money-Back Guarantee
              </h3>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Farmers */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Our Farmers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FarmerCard
            name="Joe Smith"
            image="/testimonials/joe-smith.png"
            location="California"
          />
          <FarmerCard
            name="Anna Cooper"
            image="/testimonials/anna-cooper.png"
            location="Oregon"
          />
          <FarmerCard
            name="Tad Santiago"
            image="/testimonials/tad-santiago.png"
            location="Washington"
          />
        </div>
      </section>
    </>
  );
}

function FarmerCard({
  name,
  image,
  location,
}: {
  name: string;
  image: string;
  location: string;
}) {
  return (
    <div className=" rounded-lg overflow-hidden border border-gray-200">
      <div className="relative h-96 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
}
