import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <>
      <div className="bg-amber-200 h-8">Dashboard</div>
      <Outlet />
    </>
  );
}
