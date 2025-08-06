"use client";

import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { useUploadThing } from "~/utils/uploadthing";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";

const formSchema = z.object({
  imageName: z
    .string()
    .min(5, { message: "Phone Name must be at least 5 characters long" })
    .max(50),
  brand: z.string().min(1, { message: "Brand is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  description: z.string().min(5, { message: "Description is too short" }),
});

export function UploadDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageName: "",
      brand: "",
      price: "",
      description: "",
    },
  });

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImageName(file.name);
      setSelectedImageUrl(URL.createObjectURL(file));
    } else {
      setSelectedImageName(null);
      setSelectedImageUrl(null);
      toast.error("Please select a valid image file.");
    }
  };

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadBegin: () => {
      toast("Uploading...", { duration: 100000, id: "upload-begin" });
    },
    onUploadError: () => {
      toast.dismiss("upload-begin");
      toast.error("Upload Error");
    },
    onClientUploadComplete: () => {
      toast.dismiss("upload-begin");
      toast.success("Upload Completed!");
      router.refresh();
    },
  });

  const handleImageUpload = async () => {
    if (!inputRef.current?.files?.length) {
      toast.warning("No file selected!");
      return;
    }

    const selectedImage = Array.from(inputRef.current.files);
    const values = form.getValues();

    await startUpload(selectedImage, {
      imageName: values.imageName,
      brand: values.brand,
      price: values.price,
      description: values.description,
    });

    setSelectedImageName(null);
    setSelectedImageUrl(null);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false);
    await handleImageUpload();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Image</Button>
      </DialogTrigger>

      {/* Scrollable Dialog Content */}
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Phone</DialogTitle>
          <DialogDescription>
            Select a phone image and enter its details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {selectedImageUrl && (
            <img
              src={selectedImageUrl}
              alt={selectedImageName || "Selected Image"}
              className="w-full rounded-md object-cover"
            />
          )}
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => inputRef.current?.click()}>
              <Upload />
            </Button>
            <input
              type="file"
              ref={inputRef}
              className="sr-only"
              accept="image/*"
              onChange={handleImageSelect}
            />
            {selectedImageName && (
              <div className="text-sm">Selected Image: {selectedImageName}</div>
            )}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="imageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Samsung" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 49999" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brief description of the phone"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isUploading}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
