"use server";
import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { setOrderDataCookie } from "@/lib/session";
import { error } from "console";
// const productId = nanoid();

export type ProductData = {
  productname: string;
  price: string;
  url?: string | undefined;
  // file?: FileList | undefined;
  description: string;
  paymentUrl?: string;
  productId?: string;
  sellerEmail: string;
};

export type PurchaseOrder = {
  transaction_id: string;
  product_id: string;
  buyer_email: string;
  seller_email: string;
  amount_paid: number;
  quantity: number;
  order_status: string;
};
// const supabase = createClient();

export async function createProduct(formdata: ProductData) {
  const supabase = createClient();
  console.log(formdata);

  const origin = headers().get("origin");

  const productId = nanoid();

  // To host indeendent payment links the origin to be replaced by an env variable
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

export async function createPurchaseOrder(purchaseOrderData: PurchaseOrder) {
  const supabase = createClient();
  console.log("ACTIONS Purchase Order Data :", purchaseOrderData);

  const {
    transaction_id,
    product_id,
    buyer_email,
    seller_email,
    amount_paid,
    quantity,
    order_status,
  } = purchaseOrderData;

  const { error } = await supabase.from("orders").insert({
    transaction_id,
    product_id,
    buyer_email,
    seller_email,
    amount_paid,
    quantity,
    order_status,
  });

  if (error) {
    console.error(error);
    throw new Error("Product could not be created");
  }

  revalidatePath("/myproducts");
  await setOrderDataCookie(product_id, transaction_id);
  redirect(`/thankyou/${product_id}`);
}

export async function uploadFile(fileToStorage: File) {
  const supabase = createClient();
  const imageName = nanoid();
  const { data, error } = await supabase.storage.from("gumroad").upload(
    `${imageName}`,
    fileToStorage,
    { contentType: fileToStorage.type } // Optional
  );

  if (error) {
    console.log(error);
    throw new Error("Image not uploaded");
  }

  return data;
}
