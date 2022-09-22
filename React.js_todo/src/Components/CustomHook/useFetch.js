import { useEffect, useState } from "react";

const useFetch = (url, DataChanging) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch Data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        setErr(null);
        setIsPending(false);
      })
      .catch((err) => {
        setErr(err.message);
        setIsPending(false);
      });
  }, [url, DataChanging]);
  return { data, isPending, err };
};

export default useFetch;
