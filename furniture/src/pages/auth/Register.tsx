import { Link } from "react-router";
import { Icons } from "@/components/icons";
import RegisterForm from "@/components/auth/RegisterForm";

function Register() {
  return (
    <div className="flex min-h-screen place-items-center px-4">
      <Link
        to="/"
        className="text-foreground/80 hover:text-foreground fixed top-6 left-8 flex items-center text-lg font-bold tracking-tight transition-colors"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span>Furniture Shop</span>
      </Link>
      <RegisterForm />
    </div>
  );
}

export default Register;
