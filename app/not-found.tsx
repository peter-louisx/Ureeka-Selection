import Link from "next/link";
import Image from "next/image";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative h-60 w-60 mx-auto mb-6">
            <Image
              src="https://vesvlvykfnkqxtpekfbn.supabase.co/storage/v1/object/public/assets//undraw_page-not-found_6wni.svg"
              alt="404 Illustration"
              fill
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Oops! We couldn't find the page you're looking for. It might have
            been moved or doesn't exist.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
