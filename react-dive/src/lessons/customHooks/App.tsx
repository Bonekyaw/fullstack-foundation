import { useQuery } from "../../hooks/useQuery";

import "./App.css";

type Response = {
  data: {
    id: number;
    email: string;
  };
};

function App() {
  const { data, isLoading, error } = useQuery<Response>("users/2");

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h3>Custom Hook</h3>
      <p>User Email: {data?.data.email}</p>
    </>
  );
}

export default App;
