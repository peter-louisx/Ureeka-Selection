"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Settings,
  Bell,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

// Sample data for the dashboard
const recentOrders = [
  {
    id: "ORD-7652",
    customer: "Sarah Johnson",
    date: "2023-11-15",
    status: "completed",
    total: 42.5,
    items: ["Organic Tomatoes", "Fresh Lettuce"],
  },
  {
    id: "ORD-7651",
    customer: "Michael Chen",
    date: "2023-11-14",
    status: "processing",
    total: 67.25,
    items: ["Organic Apples", "Carrots", "Honey"],
  },
  {
    id: "ORD-7650",
    customer: "Emily Rodriguez",
    date: "2023-11-14",
    status: "completed",
    total: 29.99,
    items: ["Fresh Strawberries"],
  },
  {
    id: "ORD-7649",
    customer: "David Wilson",
    date: "2023-11-13",
    status: "shipped",
    total: 53.75,
    items: ["Organic Bananas", "Blueberries", "Spinach"],
  },
  {
    id: "ORD-7648",
    customer: "Lisa Thompson",
    date: "2023-11-12",
    status: "completed",
    total: 18.5,
    items: ["Organic Carrots", "Kale"],
  },
];

const topProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    image: "/placeholder.svg?height=50&width=50",
    sales: 245,
    stock: 32,
    price: 4.99,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    image: "/placeholder.svg?height=50&width=50",
    sales: 189,
    stock: 15,
    price: 5.99,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Organic Lettuce",
    image: "/placeholder.svg?height=50&width=50",
    sales: 156,
    stock: 28,
    price: 3.49,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Honey Jar",
    image: "/placeholder.svg?height=50&width=50",
    sales: 132,
    stock: 42,
    price: 8.99,
    rating: 4.9,
  },
];

const lowStockProducts = [
  { id: 2, name: "Fresh Strawberries", stock: 15, threshold: 20 },
  { id: 5, name: "Organic Blueberries", stock: 8, threshold: 15 },
  { id: 6, name: "Fresh Basil", stock: 5, threshold: 10 },
];

export default function FarmerDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate dashboard statistics
  const totalSales = recentOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = recentOrders.length;
  const averageOrderValue = totalSales / totalOrders;
  const totalProducts = topProducts.length + lowStockProducts.length - 1; // Accounting for overlap

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r p-4">
          <nav className="space-y-1 flex-1">
            <Button
              variant={activeTab === "overview" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Overview
            </Button>
            <Button
              variant={activeTab === "orders" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Orders
            </Button>
            <Button
              variant={activeTab === "products" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("products")}
            >
              <Package className="mr-2 h-5 w-5" />
              Products
            </Button>
            <Button
              variant={activeTab === "customers" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("customers")}
            >
              <Users className="mr-2 h-5 w-5" />
              Customers
            </Button>
            <Button
              variant={activeTab === "analytics" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Analytics
            </Button>
          </nav>

          <div className="pt-4 mt-4 border-t">
            <Button
              variant={activeTab === "settings" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600">
                  Welcome back, Joe! Here's what's happening with your farm
                  today.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button asChild>
                  <Link href="/farmer/add-product">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Sales
                      </p>
                      <h3 className="text-2xl font-bold text-gray-800">
                        ${totalSales.toFixed(2)}
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <DollarSign className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>12.5%</span>
                    </div>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Orders
                      </p>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {totalOrders}
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <ShoppingCart className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>8.2%</span>
                    </div>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Avg. Order Value
                      </p>
                      <h3 className="text-2xl font-bold text-gray-800">
                        ${averageOrderValue.toFixed(2)}
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <div className="flex items-center text-red-600">
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                      <span>3.1%</span>
                    </div>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Products
                      </p>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {totalProducts}
                      </h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <Package className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200 bg-green-50"
                    >
                      {lowStockProducts.length} low stock
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="recent" className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="recent">Recent Orders</TabsTrigger>
                  <TabsTrigger value="top">Top Products</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory Alerts</TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>

              <TabsContent value="recent">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Your latest 5 orders from customers.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {recentOrders.map((order) => (
                            <tr key={order.id} className="text-sm">
                              <td className="px-4 py-3 font-medium">
                                {order.id}
                              </td>
                              <td className="px-4 py-3">{order.customer}</td>
                              <td className="px-4 py-3 text-gray-500">
                                {order.date}
                              </td>
                              <td className="px-4 py-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    order.status === "completed"
                                      ? "text-green-600 border-green-200 bg-green-50"
                                      : order.status === "processing"
                                      ? "text-blue-600 border-blue-200 bg-blue-50"
                                      : "text-amber-600 border-amber-200 bg-amber-50"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 font-medium">
                                ${order.total.toFixed(2)}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      View details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Update status
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Contact customer
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="top">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Top Selling Products</CardTitle>
                    <CardDescription>
                      Your best performing products this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {topProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-start space-x-4"
                        >
                          <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(product.rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500 ml-1">
                                {product.rating}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm font-medium">
                                ${product.price.toFixed(2)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {product.sales} sold
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Low Stock Alerts</CardTitle>
                    <CardDescription>
                      Products that need to be restocked soon.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lowStockProducts.map((product) => (
                        <div key={product.id} className="flex flex-col">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{product.name}</span>
                            <span className="text-sm text-gray-500">
                              {product.stock} / {product.threshold}
                            </span>
                          </div>
                          <Progress
                            value={(product.stock / product.threshold) * 100}
                            className={
                              product.stock < product.threshold / 2
                                ? "text-red-500"
                                : "text-amber-500"
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        Update Inventory
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                  >
                    <Package className="h-6 w-6 mb-2" />
                    <span>Add Product</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                  >
                    <TrendingUp className="h-6 w-6 mb-2" />
                    <span>View Sales</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                  >
                    <ShoppingCart className="h-6 w-6 mb-2" />
                    <span>Process Orders</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                  >
                    <Settings className="h-6 w-6 mb-2" />
                    <span>Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
