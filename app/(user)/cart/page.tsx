import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 4.99,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    unit: "bunch",
  },
  {
    id: 2,
    name: "Fresh Broccoli",
    price: 3.0,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    unit: "head",
  },
  {
    id: 3,
    name: "Organic Lemons",
    price: 2.22,
    quantity: 3,
    image: "/placeholder.svg?height=100&width=100",
    unit: "4 pieces",
  },
];

// Sample shipping options
const shippingOptions = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 5.99,
    description: "3-5 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 12.99,
    description: "1-2 business days",
  },
  {
    id: "free",
    name: "Free Shipping",
    price: 0,
    description: "Orders over $50 (5-7 business days)",
  },
];

export default function CartPage() {
  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center"
                    >
                      {/* Mobile: Product + Remove */}
                      <div className="flex justify-between md:hidden mb-2">
                        <h3 className="font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <button className="text-gray-400 hover:text-red-500">
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Product */}
                      <div className="md:col-span-6 flex items-center">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-md border border-gray-200 overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="hidden md:block font-medium text-gray-800">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.unit}
                          </p>
                          <button className="hidden md:inline-block mt-1 text-xs text-red-500 hover:text-red-700">
                            <Trash2 className="h-3 w-3 inline mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 flex justify-between md:block md:text-center mt-2 md:mt-0">
                        <span className="md:hidden text-sm text-gray-500">
                          Price:
                        </span>
                        <span className="font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-between md:justify-center items-center mt-2 md:mt-0">
                        <span className="md:hidden text-sm text-gray-500">
                          Quantity:
                        </span>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button className="px-2 py-1 text-gray-600 hover:text-green-600">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 py-1 text-sm">
                            {item.quantity}
                          </span>
                          <button className="px-2 py-1 text-gray-600 hover:text-green-600">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 flex justify-between md:block md:text-right mt-2 md:mt-0">
                        <span className="md:hidden text-sm text-gray-500">
                          Total:
                        </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <Link
                  href="/products"
                  className="inline-flex items-center text-sm text-green-600 hover:text-green-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
                <button className="text-sm text-red-500 hover:text-red-700">
                  <Trash2 className="inline h-4 w-4 mr-1" />
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="font-medium text-gray-800">Order Summary</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {/* Shipping Options */}
                  <div className="pt-2">
                    <p className="text-sm text-gray-600 mb-2">Shipping</p>
                    <div className="space-y-2">
                      {shippingOptions.map((option) => (
                        <label key={option.id} className="flex items-start">
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            defaultChecked={
                              option.id ===
                              (subtotal >= 50 ? "free" : "standard")
                            }
                            className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                          />
                          <div className="ml-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{option.name}</span>
                              <span>${option.price.toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-gray-500">
                              {option.description}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-lg">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium">
                    Proceed to Checkout
                  </button>

                  <div className="pt-4 text-xs text-gray-500">
                    <p>We accept:</p>
                    <div className="flex space-x-2 mt-2">
                      <div className="h-6 w-10 bg-gray-200 rounded"></div>
                      <div className="h-6 w-10 bg-gray-200 rounded"></div>
                      <div className="h-6 w-10 bg-gray-200 rounded"></div>
                      <div className="h-6 w-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-800 mb-2">
                  Delivery Information
                </h3>
                <p className="text-sm text-green-700">
                  We deliver to your doorstep within the specified delivery
                  timeframe. All our produce is carefully packaged to ensure
                  freshness.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="relative h-24 w-24 mx-auto mb-6">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Empty cart"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Browse Products
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
