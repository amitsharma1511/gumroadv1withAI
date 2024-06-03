// import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProductForm from "@/components/CreateProduct";
import { getProductList } from "@/utils/supabase/data-service";

export default async function AddNewProduct() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const userEmail: string = user.email || "";
  // console.log(userEmail)

  const products = await getProductList(userEmail);
  console.log(products);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <ProductForm userEmail={userEmail} />
    </div>
  );
}
