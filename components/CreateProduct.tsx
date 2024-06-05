"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProduct } from "@/utils/supabase/actions";
import { z } from "zod";

import { Button } from "@/components/ui/button";

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

interface ProductFormProps {
  sellerEmail: string;
}

const formSchema = z.object({
  productname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  price: z
    .string()
    .min(1)
    .refine(
      (value) => /^\d+(\.\d+)?$/.test(value) && !isNaN(parseFloat(value)),
      { message: "Enter a valid price" }
    ),
  url: z.string().url({ message: "Enter a valid product url" }).optional(),
  description: z
    .string()
    .min(50, { message: "Description should be at least 50 characters" }),
  file: z.custom<FileList>((val) => val instanceof FileList).optional(),
});

export default function ProductForm({ sellerEmail }: ProductFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productname: "",
      price: "",
      url: "",
      file: undefined,
      description: "",
    },
  });

  const fileRef = form.register("file");

  // TODO: Define a submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("VALUES", values);

    let response;

    if (values.file) {
      const file = values.file?.[0];
      const formData = new FormData();
      formData.append("files", file);

      response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    } else {
      console.log("No file selected");
    }

    const { file, ...remainingValues } = values;

    let uploaded_file_url;

    if (response?.ok) {
      const data = await response.json();
      uploaded_file_url = data.uploaded_file_url;
      createProduct({
        ...remainingValues,
        sellerEmail,
        url: uploaded_file_url,
      });
    } else {
      createProduct({ ...remainingValues, sellerEmail });
      console.error("ERROR: ", response?.statusText);
    }

    // console.log("Remaininf Values", remainingValues);

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="eBook on AI" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="$0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://yourproducturl.com/resource"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input type="file" {...fileRef} />
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
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormHookComponent /> */}
        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
