import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MakeMoneyButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const goToDashboard = async () => {
    "use server";

    // const supabase = createClient();
    // await supabase.auth.signOut();
    return redirect("/myproducts");
  };

  return user ? (
    <div className="ml-4 px-20 bg-blue-500 text-white hover:bg-blue-600">
      <form action={goToDashboard}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Go to Dashboard
        </button>
      </form>
    </div>
  ) : (
    <div className="ml-20 px-20 py-5 rounded bg-blue-500 text-white hover:bg-blue-600">
      <Link
        href="/login"
        className="rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Start Making Money
      </Link>
    </div>
  );
}
