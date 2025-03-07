import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            CropFresh
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-800 hover:text-green-600"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-gray-600 hover:text-green-600"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 hover:text-green-600"
          >
            About
          </Link>
          <Link
            href="/sign-in"
            className="text-sm font-medium text-gray-600 hover:text-green-600"
          >
            Sign In
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-green-600">
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/cart"
            className="relative text-gray-600 hover:text-green-600"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
