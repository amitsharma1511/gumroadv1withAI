"use server";
import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

const supabase = createClient();

export async function createProduct(formdata: FormData) {
  console.log(formdata);

  const productId = nanoid();
  const payUrl = `http://localhost:3000/buy/${productId}`;

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

  revalidatePath("/buy/myproducts");
  redirect("/myproducts");
}
