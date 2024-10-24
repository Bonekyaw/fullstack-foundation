import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="flex grow items-center bg-gray-100">
      <div className="container mx-auto p-8 text-center md:text-left">
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">
          Welcome to Our Fashion Shop
        </h1>
        <p className="mb-8 text-lg text-gray-700 md:text-xl">
          This is a simple landing page built with React, TypeScript, and
          Tailwind CSS.
        </p>
        <Link
          to="/shop"
          className="rounded-md bg-sky-600 px-6 py-3 text-white shadow hover:bg-sky-700"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}

export default Home;
