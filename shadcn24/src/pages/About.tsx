import { useParams } from "react-router";

export default function About() {
  const { "*": splat } = useParams();
  return <div>About - {splat}</div>;
}
