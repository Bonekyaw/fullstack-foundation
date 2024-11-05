import MainNavigation from "@/components/layouts/MainNavigation";
// import { siteConfig } from "@/config/site";

function Header() {
  return (
    <header className="w-full border-b">
      <div className="container flex items-center h-16">
        <MainNavigation />
      </div>
    </header>
  );
}

export default Header;
