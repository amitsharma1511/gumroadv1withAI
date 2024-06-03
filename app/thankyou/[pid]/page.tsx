import { getProductById } from "@/utils/supabase/data-service";
import { redirect } from "next/navigation";
import Link from "next/link";
import { updateSaleQuantity } from "@/utils/supabase/actions";

interface ProductParams {
  params: {
    pid: string;
  };
}

export default async function ThankYou({ params }: ProductParams) {
  interface Product {
    id: number;
    created_at: string;
    name: string;
    price: number;
    file_url: string;
    product_id: string;
    payment_url: string;
    description: string;
    seller_email: string;
    sold_quantity: number;
  }

  await updateSaleQuantity(params.pid);

  const productData: Product[] = await getProductById(params.pid);
  console.log(productData);

  if (productData.length < 1) {
    redirect("/");
  }

  const { name, description, file_url } = productData[0];

  return (
    <div className="mt-10 mb-10 flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          Thank You for Your Purchase!
        </h1>
        <h2 className="text-xl text-gray-700 mb-6">
          You have successfully purchased{" "}
          <span className="font-semibold">{name}</span>
        </h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link
          href={file_url}
          prefetch={false}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-200">
            Download your purchased content
          </button>
        </Link>
      </div>
    </div>

    // <div>
    //   <h1>Thanks for purchasing {name}</h1>
    //   <h2>Description: {description}</h2>
    //   <Link
    //     href={file_url}
    //     prefetch={false}
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     Download your purchased content
    //   </Link>
    // </div>
  );
}
