import type { Post } from "@/types";
import { Link } from "react-router-dom";

interface PostProps {
  posts: Post[];
}

function BlogCard({ posts }: PostProps) {
  return (
    <div className="my-8 grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {posts.map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id}>
          <img
            src={post.image}
            alt="Blog Post"
            className="mb-4 w-full rounded-2xl"
          />
          <h3 className="ml-4 line-clamp-1 font-semibold">{post.title}</h3>
          <div className="ml-4 mt-2 text-sm">
            <span>
              by<span className="font-semibold"> {post.author} </span>on
              <span className="font-semibold"> {post.updated_at}</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogCard;
