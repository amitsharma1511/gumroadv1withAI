import PaymentCard from "@/components/PaymentCard";
import { getProductById } from "@/utils/supabase/data-service";
import { nanoid } from "nanoid";

interface IdParams {
  params: {
    id: string;
  };
}

interface Product {
  name: string;
  price: number;
  product_id: string;
  description: string;
  seller_email: string;
}

export default async function Buy({ params }: IdParams) {
  const productId = params.id;

  const productData: Product[] = await getProductById(productId);

  const { name, description, price, seller_email } = productData[0];

  const transactionId = nanoid();

  return (
    <div>
      <h1>
        Paying ${price} for - {name}
      </h1>
      <PaymentCard
        params={params}
        seller_email={seller_email}
        price={price}
        transactionId={transactionId}
      />
    </div>
  );
}

// import { redirect } from "next/navigation";
// import { nanoid } from "nanoid";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { setOrderDataCookie } from "@/lib/session";

// interface PaymentCardParams {
//   params: {
//     id: string;
//   };
// }

// export default function PaymentCard({ params }: PaymentCardParams) {
//   const gotothanks = async (formData: FormData) => {
//     "use server";

//     // const origin = headers().get("origin");
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     // const supabase = createClient();

//     const trxId = nanoid();

//     await setOrderDataCookie(params.id, trxId);

//     redirect(`/thankyou/${params.id}`);

//     // if (error) {
//     //   return redirect("/login?message=Could not authenticate user");
//     // }

//     // return redirect("/login?message=Check email to continue sign in process");
//   };

//   return (
//     <div className="mt-10 mb-10 flex items-center justify-center">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Payment</CardTitle>
//           <CardDescription>Enter your payment details</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="name">Name</Label>
//               <Input id="name" placeholder="John Doe" />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" placeholder="example@email.com" />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="card">Card Number</Label>
//               <Input id="card" type="text" placeholder="4111 1111 1111 1111" />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="expiry-month">Expiry Month</Label>

//                 <div id="expiry-month">
//                   <Select>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select month" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="01">January</SelectItem>
//                       <SelectItem value="02">February</SelectItem>
//                       <SelectItem value="03">March</SelectItem>
//                       <SelectItem value="04">April</SelectItem>
//                       <SelectItem value="05">May</SelectItem>
//                       <SelectItem value="06">June</SelectItem>
//                       <SelectItem value="07">July</SelectItem>
//                       <SelectItem value="08">August</SelectItem>
//                       <SelectItem value="09">September</SelectItem>
//                       <SelectItem value="10">October</SelectItem>
//                       <SelectItem value="11">November</SelectItem>
//                       <SelectItem value="12">December</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="expiry-year">Expiry Year</Label>
//                 <div id="expiry-year">
//                   <Select>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select year" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="2023">2023</SelectItem>
//                       <SelectItem value="2024">2024</SelectItem>
//                       <SelectItem value="2025">2025</SelectItem>
//                       <SelectItem value="2026">2026</SelectItem>
//                       <SelectItem value="2027">2027</SelectItem>
//                       <SelectItem value="2028">2028</SelectItem>
//                       <SelectItem value="2029">2029</SelectItem>
//                       <SelectItem value="2030">2030</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="cvc">CVC</Label>
//               <Input id="cvc" type="text" placeholder="123" />
//             </div>
//             <Button
//               className="bg-blue-500 text-white hover:bg-blue-600"
//               formAction={gotothanks}
//             >
//               Pay Now
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
