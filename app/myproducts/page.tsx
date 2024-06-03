import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getProductList } from "@/utils/supabase/data-service";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";

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

export default async function MyProducts() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const userEmail: string = user.email || "";
  // console.log(userEmail)

  const products: Product[] = await getProductList(userEmail);
  // console.log(products);

  return (
    <>
      <div className="px-5 py-5 mb-10 w-48 rounded bg-blue-500 text-white hover:bg-blue-600">
        <Link
          href="/addnewproduct"
          className="rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Create New Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Product Name</TableHead>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead className="w-[200px]">Resource URL</TableHead>
              <TableHead className="w-[200px]">Payment URL</TableHead>
              <TableHead className="w-[300px]">Description</TableHead>
              <TableHead className="w-[100px]">Sale Count</TableHead>
              <TableHead className="w-[100px]">Total Sales</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: Product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Link
                      href={product.file_url}
                      prefetch={false}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={product.payment_url}
                      prefetch={false}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy Now
                    </Link>
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.sold_quantity}</TableCell>
                  <TableCell>
                    ${product.sold_quantity * product.price}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
