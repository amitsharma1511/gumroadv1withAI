import { createClient } from "@/utils/supabase/server";

// const supabase = createClient();

export const getProductList = async function (email: string | undefined) {
  //   console.log("SUPABASE FN", email);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("seller")
    .select()
    .eq("seller_email", email);

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
};

export const getProductById = async function (productId: string) {
  const supabase = createClient();
  //   console.log("SUPABASE FN", email);
  const { data, error } = await supabase
    .from("seller")
    .select("name ,price, description, product_id, seller_email")
    .eq("product_id", productId);

  if (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }

  return data;
};

export const getFileUrl = async function (productId: string) {
  const supabase = createClient();
  //   console.log("SUPABASE FN", email);
  const { data, error } = await supabase
    .from("seller")
    .select("name, description, file_url")
    .eq("product_id", productId);

  if (error) {
    console.error(error);
    throw new Error("Product download URL could not be found");
  }

  return data;
};

export const get_seller_products_with_sales = async function (
  seller_email: string
) {
  const supabase = createClient();
  //   console.log("SUPABASE FN", email);
  const { data, error } = await supabase.rpc("get_seller_products_with_sales", {
    s_seller_email: seller_email,
  });

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Product download URL could not be found");
  }

  return data;
};
