import { Outlet } from "react-router-dom";
import Header from "@/components/layouts/Header";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

export default RootLayout;
