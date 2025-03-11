import { useSearchParams } from "react-router";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";

// import { products, filterList } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
// import Pagination from "@/components/products/Pagination";
import {
  categoryTypeQuery,
  productInfiniteQuery,
  queryClient,
} from "@/api/query";
import { Button } from "@/components/ui/button";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawCategory = searchParams.get("categories");
  const rawType = searchParams.get("types");

  // Decode & parse search params
  const selectedCategory = rawCategory
    ? decodeURIComponent(rawCategory)
        .split(",")
        .map((cat) => Number(cat.trim()))
        .filter((cat) => !isNaN(cat))
        .map((cat) => cat.toString())
    : [];

  const selectedType = rawType
    ? decodeURIComponent(rawType)
        .split(",")
        .map((type) => Number(type.trim()))
        .filter((type) => !isNaN(type))
        .map((type) => type.toString())
    : [];

  const cat = selectedCategory.length > 0 ? selectedCategory.join(",") : null;
  const typ = selectedType.length > 0 ? selectedType.join(",") : null;

  const { data: cateType } = useSuspenseQuery(categoryTypeQuery());
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    // isFetchingPreviousPage,
    fetchNextPage,
    // fetchPreviousPage,
    hasNextPage,
    // hasPreviousPage,
    refetch,
  } = useInfiniteQuery(productInfiniteQuery(cat, typ));

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  const handleFilterChange = (categories: string[], types: string[]) => {
    const newParams = new URLSearchParams();
    if (categories.length > 0)
      newParams.set("categories", encodeURIComponent(categories.join(",")));
    if (types.length > 0)
      newParams.set("types", encodeURIComponent(types.join(",")));

    // Updates URL & triggers refetch via query key
    setSearchParams(newParams);
    // Cancel In-flight queries
    queryClient.cancelQueries({ queryKey: ["products", "infinite"] });
    // Clear cache
    queryClient.removeQueries({ queryKey: ["products", "infinite"] });
    refetch();
  };

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="container mx-auto">
      <section className="flex flex-col lg:flex-row">
        <section className="my-8 ml-4 w-full lg:ml-0 lg:w-1/5">
          <ProductFilter
            filterList={cateType}
            selectedCategory={selectedCategory}
            selectedType={selectedType}
            onFilterChange={handleFilterChange}
          />
        </section>
        <section className="w-full lg:ml-0 lg:w-4/5">
          <h1 className="my-8 ml-4 text-2xl font-bold">All Products</h1>
          <div className="mb-12 grid grid-cols-1 gap-6 gap-y-12 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* <Pagination /> */}
          <div className="my-4 flex justify-center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              variant={!hasNextPage ? "ghost" : "secondary"}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
            </Button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </section>
      </section>
    </div>
  );
}

export default Product;
