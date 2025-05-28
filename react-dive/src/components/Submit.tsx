import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create Post"}
    </button>
  );
}
