import { useEffect, useState } from "react";

type UseQueryResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

const baseURL = "https://reqres.in/api/";

export function useQuery<T = unknown>(endpoint: string): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(baseURL + endpoint);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        // console.log("Result:", result);

        setData(result);
      } catch (err) {
        console.log("Error:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
}
