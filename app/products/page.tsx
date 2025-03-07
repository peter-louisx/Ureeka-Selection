import ProductCard from "@/components/product-card";
// Product data
const products = [
  {
    id: 1,
    name: "Fresh Peach",
    price: 4.99,
    image: "/placeholder.svg?height=150&width=150",
    unit: "1 Kg",
  },
  {
    id: 2,
    name: "Pineapple",
    price: 3.5,
    image: "/placeholder.svg?height=150&width=150",
    unit: "1 Kg",
  },
  {
    id: 3,
    name: "Organic Lemons",
    price: 2.22,
    image: "/placeholder.svg?height=150&width=150",
    unit: "1 Kg",
  },
  {
    id: 4,
    name: "Fresh Peach",
    price: 4.99,
    image: "/placeholder.svg?height=150&width=150",
    unit: "1 Kg",
  },
  {
    id: 5,
    name: "Fresh Broccoli",
    price: 3.0,
    image: "/placeholder.svg?height=150&width=150",
    unit: "1 Kg",
  },
  {
    id: 6,
    name: "Fresh Cauliflower",
    price: 2.5,
    image: "/placeholder.svg?height=150&width=150",
    unit: "1 Kg",
  },
  {
    id: 7,
    name: "Green Lettuce",
    price: 1.99,
    image: "/placeholder.svg?height=150&width=150",
    unit: "1 Kg",
  },
  {
    id: 8,
    name: "Cucumber",
    price: 1.5,
    image: "/placeholder.svg?height=150&width=150",
    unit: "1 Kg",
  },
  {
    id: 9,
    name: "Bell Pepper Red",
    price: 2.99,
    image: "/placeholder.svg?height=150&width=150",
    unit: "1 Kg",
  },
];

export default function Page() {
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
              unit={product.unit}
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
