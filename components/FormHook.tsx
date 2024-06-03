import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function FormHookComponent() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white hover:bg-blue-600"
    >
      {pending ? "Creating product" : "Submit"}
    </Button>
  );
}
