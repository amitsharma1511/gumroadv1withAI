"use server";
import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
// const productId = nanoid();

export type FormData = {
  productname: string;
  price: string;
  url?: string | undefined;
  file?: FileList | undefined;
  description: string;
  paymentUrl?: string;
  productId?: string;
  sellerEmail: string;
};

// const supabase = createClient();

export async function createProduct(formdata: FormData) {
  const supabase = createClient();
  console.log(formdata);

  const origin = headers().get("origin");

  const productId = nanoid();
  const payUrl = `${origin}/buy/${productId}`;

  const { productname, price, url, description, sellerEmail } = formdata;

  const { error } = await supabase.from("seller").insert({
    name: productname,
    price: parseFloat(price),
    file_url: url,
    product_id: productId,
    payment_url: payUrl,
    description: description,
    seller_email: sellerEmail,
  });

  if (error) {
    console.error(error);
    throw new Error("Product could not be created");
  }

  revalidatePath("/myproducts");
  redirect("/myproducts");
}

export async function updateSaleQuantity(productId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("increment_sold_quantity", {
    p_product_id: productId,
  });

  if (error) {
    console.error("Error updating sale quantity:", error);
  } else {
    console.log("Sale quantity updated successfully:", data);
  }

  revalidatePath("/myproducts");
}
