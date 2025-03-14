"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/contexts/AuthContext";
import supabase from "@/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function FileUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setUploading(true);
    setProgress(0);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("assets") // replace with your bucket name
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      toast("upload successful");

      // Optionally, you can do something with the uploaded file data here
      console.log("File uploaded: ", data);
    } catch (error) {
      toast("error");
    } finally {
      setUploading(false);
      setFile(null);
      setProgress(0);
    }
  };

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>
            Upload a file to your Supabase storage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" onChange={handleFileChange} disabled={uploading} />
          {progress > 0 && <Progress value={progress} className="w-full" />}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full"
          >
            {uploading ? `Uploading... ${progress}%` : "Upload"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
