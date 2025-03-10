import { Link, useLoaderData } from "react-router";
// import { posts } from "@/data/posts";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import RichTextRenderer from "@/components/blogs/RichTextRenderer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { onePostQuery, postQuery } from "@/api/query";
import { Post, Tag } from "@/types";

const imageUrl = import.meta.env.VITE_IMG_URL;

function BlogDetail() {
  // const { postId } = useParams();
  // const post = posts.find((post) => post.id === postId);
  const { postId } = useLoaderData();
  const { data: postsData } = useSuspenseQuery(postQuery("?limit=6"));
  const { data: postDetail } = useSuspenseQuery(onePostQuery(postId));

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <section className="flex flex-col lg:flex-row">
        <section className="w-full lg:w-3/4 lg:pr-16">
          <Button variant="outline" asChild className="mb-6 mt-8">
            <Link to="/blogs">
              <Icons.arrowLeft />
              All Posts
            </Link>
          </Button>
          {postDetail ? (
            <>
              <h2 className="mb-3 text-3xl font-extrabold">
                {postDetail.post.title}
              </h2>
              <div className="text-sm">
                <span>
                  by
                  <span className="font-[600]">
                    {" "}
                    {postDetail.post.author.fullName}{" "}
                  </span>
                  on
                  <span className="font-[600]">
                    {" "}
                    {postDetail.post.updatedAt}
                  </span>
                </span>
              </div>
              <h3 className="my-6 text-base font-[400]">
                {postDetail.post.content}
              </h3>
              <img
                src={imageUrl + postDetail.post.image}
                alt={postDetail.post.title}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl"
              />
              <RichTextRenderer
                content={postDetail.post.body}
                className="my-8"
              />
              <div className="mb-12 space-x-2">
                {postDetail.post.tags.map((tag: Tag) => (
                  <Button variant="secondary">{tag.name}</Button>
                ))}
              </div>
            </>
          ) : (
            <p className="mb-16 mt-8 text-center text-xl font-bold text-muted-foreground lg:mt-24">
              No post found
            </p>
          )}
        </section>
        <section className="w-full lg:mt-24 lg:w-1/4">
          <div className="mb-8 flex items-center gap-2 text-base font-semibold">
            <Icons.layers />
            <h3 className="">Other Blog Posts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
            {postsData.posts.map((post: Post) => (
              <Link
                to={`/blogs/${post.id}`}
                className="mb-6 flex items-start gap-2"
              >
                <img
                  src={imageUrl + post.image}
                  alt="blog post"
                  loading="lazy"
                  decoding="async"
                  className="w-1/4 rounded"
                />
                <div className="w-3/4 text-sm font-[500] text-muted-foreground">
                  <p className="line-clamp-2">{post.content}</p>
                  <i>... see more</i>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

export default BlogDetail;
