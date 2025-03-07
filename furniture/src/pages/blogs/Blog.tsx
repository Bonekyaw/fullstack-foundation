import { useInfiniteQuery } from "@tanstack/react-query";

import { postInfiniteQuery } from "@/api/query";
// import { posts } from "@/data/posts";
import BlogPostList from "@/components/blogs/BlogPostList";
import { Button } from "@/components/ui/button";

function Blog() {
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
  } = useInfiniteQuery(postInfiniteQuery());

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];
  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="container mx-auto">
      <h1 className="mt-8 text-center text-2xl font-bold md:text-left">
        Latest Blog Posts
      </h1>
      <BlogPostList posts={allPosts} />
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
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </div>
  );
}

export default Blog;
