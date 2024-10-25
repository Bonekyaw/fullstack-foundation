import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="flex grow items-center bg-gray-100">
      <div className="container mx-auto text-center md:text-left">
        <h2 className="mb-4 text-6xl font-bold text-gray-800">404</h2>
        <p className="tex-lg mb-8 text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="rounded-md bg-sky-600 px-6 py-3 text-white shadow hover:bg-sky-700"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
