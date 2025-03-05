import MainNavigation from "@/components/layouts/MainNavigation";
import MobileNavigation from "./MobileNavigation";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "@/components/mode-toggle";
import AuthDropDown from "@/components/layouts/AuthDropDown";
import CartSheet from "@/components/layouts/CartSheet";
import { User } from "@/data/user";
import ProgressBar from "@/components/progress-bar";

function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background">
      <nav className="container mx-auto flex h-16 items-center">
        <ProgressBar />
        <MainNavigation items={siteConfig.mainNav} />
        <MobileNavigation items={siteConfig.mainNav} />
        <div className="mr-8 flex flex-1 items-center justify-end space-x-4 lg:mr-0">
          <CartSheet />
          <ModeToggle />
          <AuthDropDown user={User} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
