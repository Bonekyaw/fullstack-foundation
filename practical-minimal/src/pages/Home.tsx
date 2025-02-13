import { Link } from "react-router";

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
          className="rounded-md bg-sky-600 px-6 py-3 text-white shadow-sm hover:bg-sky-700"
        >
          Get Started
        </Link>
        <fieldset className="mt-8">
          <legend>Published status</legend>

          <input
            id="draft"
            className="peer/draft"
            type="radio"
            name="status"
            checked
          />
          <label htmlFor="draft" className="peer-checked/draft:text-sky-500">
            Draft
          </label>

          <input
            id="published"
            className="peer/published"
            type="radio"
            name="status"
          />
          <label
            htmlFor="published"
            className="peer-checked/published:text-sky-500"
          >
            Published
          </label>

          <div className="hidden peer-checked/draft:block">
            Drafts are only visible to administrators.
          </div>
          <div className="hidden peer-checked/published:block">
            Your post will be publicly visible on your site.
          </div>
        </fieldset>
      </div>
    </section>
  );
}

export default Home;
