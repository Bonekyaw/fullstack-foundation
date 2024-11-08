import { Outlet } from "react-router-dom";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
