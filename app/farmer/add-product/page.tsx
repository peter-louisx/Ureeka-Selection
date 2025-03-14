"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { ArrowLeft, Plus, X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import * as z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  discountPrice: z.coerce
    .number()
    .positive("Discount price must be greater than 0")
    .optional(),
  unit: z.string().min(1, "Unit is required (e.g., kg, bunch, piece)"),
  stock: z.coerce
    .number()
    .int()
    .nonnegative("Stock must be a non-negative number"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters"),
  details: z.array(z.string()).min(1, "Please add at least one detail"),
  organicCertified: z.boolean().optional(),
  featured: z.boolean().optional(),
  images: z.array(z.string()).min(1, "Please upload at least one image"),
});

type FormValues = z.infer<typeof formSchema>;

// Sample categories
const categories = [
  { id: "vegetables", name: "Vegetables" },
  { id: "fruits", name: "Fruits" },
  { id: "dairy", name: "Dairy" },
  { id: "bakery", name: "Bakery" },
  { id: "meat", name: "Meat" },
  { id: "eggs", name: "Eggs" },
  { id: "honey", name: "Honey" },
  { id: "herbs", name: "Herbs & Spices" },
];

export default function AddProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      discountPrice: undefined,
      unit: "",
      stock: 0,
      description: "",
      details: [""],
      organicCertified: false,
      featured: false,
      images: [],
    },
  });

  //   const { fields, append, remove } = useFieldArray({
  //     control: form.control,
  //     name: "details",
  //   });

  // Simulate image upload
  const handleImageUpload = () => {
    // In a real app, you would handle file uploads to a storage service
    const newImage = `/placeholder.svg?height=200&width=200&text=Product+${
      previewImages.length + 1
    }`;
    setPreviewImages([...previewImages, newImage]);

    const currentImages = form.getValues("images");
    form.setValue("images", [...currentImages, newImage], {
      shouldValidate: true,
    });
  };

  const removeImage = (index: number) => {
    const updatedImages = [...previewImages];
    updatedImages.splice(index, 1);
    setPreviewImages(updatedImages);

    const currentImages = form.getValues("images");
    const updatedFormImages = [...currentImages];
    updatedFormImages.splice(index, 1);
    form.setValue("images", updatedFormImages, { shouldValidate: true });
  };

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      console.log("Product submitted:", data);
      // In a real app, you would send this data to your API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      alert("Product added successfully!");
      form.reset();
      setPreviewImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link
            href="/farmer/dashboard"
            className="inline-flex items-center text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Add New Product
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Fill in the details about your product. Complete and accurate
                information helps customers make informed decisions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Organic Tomatoes" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discountPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Price ($) (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="Leave empty if no discount"
                              {...field}
                              value={
                                field.value === undefined ? "" : field.value
                              }
                              onChange={(e) => {
                                const value =
                                  e.target.value === ""
                                    ? undefined
                                    : Number.parseFloat(e.target.value);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="kg, bunch, piece, etc."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Stock</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your product in detail. Include information about taste, texture, growing methods, etc."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <FormLabel>Product Details</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          form.setValue("details", [
                            ...form.getValues("details"),
                            "",
                          ]);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Detail
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {form.getValues("details").map((field, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`details.${index}`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    placeholder="e.g., Organic certified, Locally grown, etc."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updatedDetails = [
                                  ...form.getValues("details"),
                                ];
                                updatedDetails.splice(index, 1);
                                form.setValue("details", updatedDetails);
                              }}
                              className="h-10 w-10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="organicCertified"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Organic Certified</FormLabel>
                            <FormDescription>
                              Check if your product is certified organic
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Featured Product</FormLabel>
                            <FormDescription>
                              Check to highlight this product on the homepage
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormLabel className="block mb-2">Product Images</FormLabel>
                    <FormField
                      control={form.control}
                      name="images"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {previewImages.map((image, index) => (
                              <div
                                key={index}
                                className="relative border rounded-md overflow-hidden h-40"
                              >
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`Product image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2 h-6 w-6"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              className="h-40 flex flex-col items-center justify-center border-dashed"
                              onClick={handleImageUpload}
                            >
                              <Upload className="h-6 w-6 mb-2" />
                              <span>Upload Image</span>
                            </Button>
                          </div>
                          <FormDescription>
                            Upload at least one image of your product.
                            High-quality images increase sales.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding Product...
                        </>
                      ) : (
                        "Add Product"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-[#f3f5d8] py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2023 CropFresh. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
