import AuthButton from "@/components/AuthButton";
import HomeContent from "@/components/HomeContent";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <HomeContent />
    </div>
  );
}
