"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Star,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReviewForm from "@/components/review-form";
import { useAuth } from "@/components/contexts/AuthContext";
import supabase from "@/supabase";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "March 15, 2023",
    title: "Perfect ripeness every time!",
    content:
      "These bananas are consistently perfect. They arrive slightly green and ripen over a few days, giving me plenty of time to enjoy them. The flavor is exceptional - sweet and creamy. Will definitely order again!",
    helpfulCount: 12,
    notHelpfulCount: 2,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "February 28, 2023",
    title: "Great quality, but packaging could be better",
    content:
      "The bananas themselves are excellent - organic and very tasty. My only complaint is that sometimes they get slightly bruised during shipping. Otherwise, they're perfect for my morning smoothies and as a quick snack.",
    helpfulCount: 8,
    notHelpfulCount: 1,
  },
  {
    id: 3,
    name: "Emily Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "January 12, 2023",
    title: "Best bananas I've ever had!",
    content:
      "I can really taste the difference with these organic bananas. They have so much more flavor than the ones from my local supermarket. My kids love them too! The fact that they're sustainably grown makes me feel even better about purchasing them.",
    helpfulCount: 15,
    notHelpfulCount: 0,
  },
];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const router = useRouter();
  const { session, user } = useAuth();
  const { slug } = use(params);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);
  const [product, setProduct] = useState<{
    id: string;
    name: string;
    price: number;
    rating: number;
    reviewCount: number;
    description: string;
    image: string;
    farmer: {
      name: string;
      location: string;
      image: string;
    };
  }>({
    id: "",
    name: "",
    price: 0,
    rating: 0,
    reviewCount: 0,
    description: "",
    image: "",
    farmer: {
      name: "",
      location: "",
      image: "",
    },
  });

  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    const { data: cartData, error: cartError } = await supabase
      .from("cart")
      .select("*")
      .eq("product_id", data.id)
      .eq("user_id", user?.id)
      .single();

    if (cartData) {
      setInCart(true);
    }

    setProduct({
      id: data.id,
      name: data.name,
      price: data.price,
      rating: 4.8,
      reviewCount: 124,
      description: data.description,
      image: data.image,
      farmer: {
        name: "Joe Smith",
        location: "California",
        image: "/placeholder.svg?height=50&width=50",
      },
    });
  };

  const addToCart = async () => {
    if (user) {
      await supabase
        .from("cart")
        .insert([
          {
            user_id: user.id,
            product_id: product.id,
            quantity,
          },
        ])
        .then(() => {
          setInCart(true);
          toast.success("Product added to cart!");
        });
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchProduct().then(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-green-600">
                Home
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>
              <Link
                href="/products"
                className="text-gray-500 hover:text-green-600"
              >
                Products
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>
              <span className="text-gray-700">{product.name}</span>
            </li>
          </ol>
        </nav>

        {
          // Loading state
          loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-green-500 rounded-full"></div>
            </div>
          )
        }

        {!loading && (
          <>
            {" "}
            {/* Product Detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative h-80 md:h-96 w-full border border-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>

                <div className="flex items-center mb-4">
                  <span className="text-xl font-bold text-green-600">
                    Rp. {product.price.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        if (quantity > 1) setQuantity(quantity - 1);
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-3 py-1 border-x border-gray-300">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {!inCart && (
                    <Button className="flex-1" onClick={addToCart}>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  )}

                  {inCart && (
                    <Link href="/cart">
                      <Button className="flex-1">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        View Cart
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={product.farmer.image || "/placeholder.svg"}
                        alt={product.farmer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Grown by</p>
                      <p className="text-sm font-medium">
                        {product.farmer.name}, {product.farmer.location}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-green-600"
                  >
                    <Share2 className="mr-1 h-4 w-4" />
                    Share
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-xs">
                      Free shipping on orders over $50
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="h-5 w-5 text-green-600" />
                    <span className="text-xs">30-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-xs">Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Reviews Section */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Customer Reviews
              </h2>

              {/* Review Summary */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-3xl font-bold text-gray-800 mr-2">
                          {product.rating}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {product.reviewCount} customer reviews
                      </p>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <Separator className="my-6" />
                  <h3 className="text-sm font-medium text-gray-800 mb-3">
                    Rating Breakdown
                  </h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <div className="flex items-center w-24">
                          <span className="text-sm text-gray-600 mr-2">
                            {rating} stars
                          </span>
                        </div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{
                              width: `${
                                rating === 5
                                  ? 70
                                  : rating === 4
                                  ? 20
                                  : rating === 3
                                  ? 5
                                  : rating === 2
                                  ? 3
                                  : 2
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="w-12 text-right">
                          <span className="text-xs text-gray-500">
                            {rating === 5
                              ? 70
                              : rating === 4
                              ? 20
                              : rating === 3
                              ? 5
                              : rating === 2
                              ? 3
                              : 2}
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Review List */}
              <div className="space-y-6">
                {/* Sample reviews */}
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                          <Image
                            src={review.avatar || "/placeholder.svg"}
                            alt={`${review.name} avatar`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {review.name}
                              </h4>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                              {review.date}
                            </div>
                          </div>
                          <h5 className="font-medium text-gray-800 mb-2">
                            {review.title}
                          </h5>
                          <p className="text-gray-600 mb-4">{review.content}</p>
                          <div className="flex items-center text-sm">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-gray-500 hover:text-gray-700"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Helpful ({review.helpfulCount})
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-gray-500 hover:text-gray-700 ml-4"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              Not helpful ({review.notHelpfulCount})
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {session && (
                <div className="mt-8">
                  <ReviewForm />
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
