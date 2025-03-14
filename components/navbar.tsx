"use client";

import Link from "next/link";
import supabase from "@/supabase";
import { Search, ShoppingCart } from "lucide-react";
import { useAuth } from "./contexts/AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Bell } from "lucide-react";

export default function Navbar() {
  const { session } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push("/");
    toast.success("Signed out successfully");
  };

  const isFarmer = pathname.startsWith("/farmer");

  return (
    <>
      {isFarmer && (
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-gray-800">
                  CropFresh
                </Link>
                <span className="ml-2 text-sm text-gray-500">
                  Farmer Portal
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search orders, products..."
                    className="w-full pl-9"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="Farmer profile"
                        />
                        <AvatarFallback>GF</AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-sm font-medium text-left">
                        Green Valley Farm
                        <span className="block text-xs font-normal text-gray-500">
                          Joe Smith
                        </span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/farmer/profile" className="flex w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/farmer/settings" className="flex w-full">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/farmer/analytics" className="flex w-full">
                        Analytics
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/farmer/help" className="flex w-full">
                        Help & Support
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/" className="flex w-full">
                        Sign out
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>
      )}
      {!isFarmer && (
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
              {session && (
                //sign out
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-gray-600 hover:text-green-600"
                >
                  Sign Out
                </button>
              )}

              {!session && (
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-600 hover:text-green-600"
                >
                  Sign In
                </Link>
              )}
            </nav>
            {session && (
              <div className="flex items-center space-x-4">
                <Link
                  href="/cart"
                  className="relative text-gray-600 hover:text-green-600"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </header>
      )}
    </>
  );
}
