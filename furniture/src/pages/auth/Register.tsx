import { Link } from "react-router-dom";
import { Icons } from "@/components/icons";
import RegisterForm from "@/components/auth/RegisterForm";

function Register() {
  return (
    <div className="flex min-h-screen place-items-center px-4">
      <Link
        to="/"
        className="fixed left-8 top-6 flex items-center text-lg font-bold tracking-tight text-foreground/80 transition-colors hover:text-foreground"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span>Furniture Shop</span>
      </Link>
      <RegisterForm />
    </div>
  );
}

export default Register;
