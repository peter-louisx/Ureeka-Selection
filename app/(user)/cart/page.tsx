"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";
import supabase from "@/supabase";
import { useAuth } from "@/components/contexts/AuthContext";
import { set } from "react-hook-form";
import { toast } from "sonner";

// Sample shipping options
const shippingOptions = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 10000,
    description: "3-5 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 20000,
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
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState<
    {
      id: number;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }[]
  >([]);

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  useEffect(() => {
    async function fetchCartItems() {
      if (user) {
        let { data, error } = await supabase
          .from("cart")
          .select("products(id, name, image, price), quantity")
          .eq("user_id", user.id);

        if (data) {
          setCartItems(
            data.map((item) => {
              return {
                //@ts-ignore
                id: item.products.id,
                //@ts-ignore

                name: item.products.name,
                //@ts-ignore

                price: item.products.price,
                quantity: item.quantity,
                //@ts-ignore

                image: item.products.image,
              };
            }) || []
          );
        }
      }
    }

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (productId: number) => {
    if (user) {
      let { error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);

      if (error) {
        toast.error("An error occurred while removing the item from cart");
      } else {
        toast.success("Item removed from cart");
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== productId)
        );
      }
    }
  };

  const removeAllItems = async () => {
    if (user) {
      let { error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id);

      if (error) {
        toast.error("An error occurred while clearing the cart");
      } else {
        toast.success("Cart cleared successfully");
        setCartItems([]);
      }
    }
  };

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

                          <button
                            className="hidden md:inline-block mt-1 text-xs text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem(item.id)}
                          >
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
                          Rp. {item.price.toLocaleString("id-ID")}
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
                          Rp.{" "}
                          {(item.price * item.quantity).toLocaleString("id-ID")}
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
                <button
                  className="text-sm text-red-500 hover:text-red-700"
                  onClick={removeAllItems}
                >
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
                    <span className="font-medium">
                      Rp. {subtotal.toLocaleString("id-ID")}
                    </span>
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
                            <div className="flex  text-sm gap-1">
                              <span className="font-medium">{option.name}</span>
                              <span>
                                Rp. {option.price.toLocaleString("id-ID")}
                              </span>
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
                    <span className="font-medium">
                      Rp. {tax.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-lg">
                        Rp. {total.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium">
                    Proceed to Checkout
                  </button>
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
            <div className="relative h-60 w-60 mx-auto mb-6">
              <Image
                src="https://vesvlvykfnkqxtpekfbn.supabase.co/storage/v1/object/public/assets//undraw_empty-cart_574u.svg"
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
