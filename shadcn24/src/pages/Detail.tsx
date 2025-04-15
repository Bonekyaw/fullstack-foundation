import { useParams } from "react-router";

export default function Detail() {
  const { pid, uid } = useParams();

  return (
    <div>
      Detail - {pid} : {uid}
    </div>
  );
}
