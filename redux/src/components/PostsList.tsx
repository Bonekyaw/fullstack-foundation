// import { Loader2 } from "lucide-react";

import { useAppSelector } from "@/hooks/useRedux";
import // fetchPosts,
// addPost,
// selectAllPosts,
// selectPostsByUser,
// selectPostIds,
// selectPostsStatus,
// selectPostsError,
// type Post,
"@/store/postsSlice";
import PostItem from "./PostItem";
import {
  // useGetPostsQuery,
  // selectAllPosts,
  // selectPostsByUserId,
  selectPostsIds,
} from "@/store/rtk/postsSlice";
import PostInput from "./PostInput";

function PostsList() {
  // const dispatch = useAppDispatch();
  // const { status, error } = useAppSelector((state) => state.posts);
  // const posts = useAppSelector((state) => selectPostsByUserId(state, "user2"));
  const postsIds = useAppSelector((state) => selectPostsIds(state, "user2"));
  // const posts = useAppSelector(selectAllPosts);
  // const userPosts = posts.filter((post) => post.userId === "user2");

  // const postIds = useAppSelector(selectPostIds);
  // const status = useAppSelector(selectPostsStatus);
  // const error = useAppSelector(selectPostsError);

  // const {
  //   data: posts = [],
  //   isLoading,
  //   // isFetching,
  //   isSuccess,
  //   isError,
  //   error,
  //   // refetch,
  // } = useGetPostsQuery();

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">📌 Post Manager</h1>

      <PostInput />

      {/* {isLoading && (
        <div className="flex items-center gap-2 text-blue-600 mb-4">
          <Loader2 className="animate-spin h-5 w-5" />
          <span>Loading posts...</span>
        </div>
      )} */}

      {/* {isError && <div className="text-red-500">Error: {error.toString()}</div>} */}

      <div className="grid gap-4 w-full max-w-md">
        {/* {isSuccess &&
          posts.map((post: Post) => <PostItem key={post.id} post={post} />)} */}
        {postsIds.map((postId: string) => (
          <PostItem key={postId} postId={postId} />
        ))}
      </div>
    </>
  );
}

export default PostsList;
