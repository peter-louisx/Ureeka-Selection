"use client";

import ProductCard from "@/components/product-card";
import { useState, useEffect } from "react";
import supabase from "@/supabase";

export default function Page() {
  const [products, setProducts] = useState<
    {
      id: number;
      name: string;
      price: number;
      image: string;
      unit: string;
      slug: string;
    }[]
  >([]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, price, image, slug");

    setProducts(data as any);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Categories Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-5rem)] md:overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Categories</h2>
        <div className="space-y-3">
          <CategoryItem name="Vegetables" icon="🥦" active />
          <CategoryItem name="Fruits" icon="🍎" />
          <CategoryItem name="Dairy" icon="🥛" />
          <CategoryItem name="Bakery" icon="🍞" />
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 p-2">
        <h1 className="text-2xl font-bold mb-6">All Product</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function CategoryItem({
  name,
  icon,
  active = false,
}: {
  name: string;
  icon: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
        active ? "bg-green-50" : "hover:bg-gray-50"
      }`}
    >
      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center ${
          active ? "bg-green-100" : "bg-gray-100"
        }`}
      >
        <span className="text-xl">{icon}</span>
      </div>
      <span
        className={`text-sm ${
          active ? "font-medium text-green-600" : "text-gray-700"
        }`}
      >
        {name}
      </span>
    </div>
  );
}
