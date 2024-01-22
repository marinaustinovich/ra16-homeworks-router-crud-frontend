import { useEffect, useState } from "react";

type ErrorType = {
  message: string;
};

const usePolling = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!ignore) {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const json = await response.json();
          setData(json);
          setLoading(false);
        }
      } catch (error) {
        if (!ignore) {
          setError((error as ErrorType).message);

          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return [data, isLoading, error] as const;
};

export default usePolling;
