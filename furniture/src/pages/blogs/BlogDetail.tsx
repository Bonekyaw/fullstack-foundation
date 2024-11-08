import { useParams } from "react-router-dom";

function BlogDetail() {
  const { postId } = useParams();

  return <div>BlogDetail : {postId}</div>;
}

export default BlogDetail;
