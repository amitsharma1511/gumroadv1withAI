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
    .select()
    .eq("product_id", productId);

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
};
