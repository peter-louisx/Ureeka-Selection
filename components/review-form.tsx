"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "./contexts/AuthContext";
import supabase from "@/supabase";

const formSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  content: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must be less than 1000 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReviewForm({ productId }: { productId: string }) {
  const { user } = useAuth();
  const [hoveredRating, setHoveredRating] = useState(0);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      title: "",
      content: "",
    },
  });

  async function onSubmit(data: FormValues) {
    await supabase.from("product_review").insert({
      product_id: productId,
      rating: data.rating,
      title: data.title,
      content: data.content,
      user_id: user?.id,
    });

    form.reset({
      rating: 0,
      title: "",
      content: "",
    });

    toast.success("Review submitted successfully!");
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="focus:outline-none"
                          onMouseEnter={() => setHoveredRating(rating)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => field.onChange(rating)}
                        >
                          <Star
                            className={`h-6 w-6 ${
                              rating <= (hoveredRating || field.value)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Summarize your experience" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you like or dislike about this product?"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Submit Review</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
