import { Outlet } from "react-router";

export default function product() {
  return (
    <>
      <div className="bg-amber-500 h-8">product Layout</div>
      <Outlet />
    </>
  );
}
