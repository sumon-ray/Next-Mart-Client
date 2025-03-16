"use client";
// import Logo from "@/app/assets/svgs/Logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import ImagePreviewer from "@/components/ui/core/ImageUploader/ImagePreviewer";
import ImageUploader from "@/components/ui/core/ImageUploader";
import createCategory from "@/services/category";
import { toast } from "sonner";
const CategoryForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("icon", imageFiles[0] as File);
      const res = await createCategory(formData);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {}
  };
  return (
    <div>
      <Dialog>
      <DialogTrigger asChild>
  <button className="btn-primary">
    <span>Create Category</span> {/* ✅ এটা এখন বৈধ */}
  </button>
</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name </FormLabel>
                    <FormControl>
                      {/* Your form field */}
                      <Input type="text" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* text area */}
              <div className="flex justify-between items-center gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-36 w-72"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {imagePreview.length > 0 ? (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    className="mt-8"
                  />
                ) : (
                  <div className="mt-8">
                    <ImageUploader
                      setImageFiles={setImageFiles}
                      setImagePreview={setImagePreview}
                      label="Upload Logo"
                    />
                  </div>
                )}
              </div>
              <Button className="flex flex-col mx-auto w-full" type="submit">
                {" "}
                {isSubmitting ? <LoaderIcon /> : "create"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryForm;
