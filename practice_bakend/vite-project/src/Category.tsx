import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  id: number;
}

function Category() {
  const [product, setProduct] = useState<Props[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const contorller = new AbortController();

    setIsLoading(true);

    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        signal: contorller.signal,
      })
      .then((res) => {
        setProduct(res.data), setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => contorller.abort();
  }, []);

  function handleClick(id: number) {
    const storeValue = [...product];
    const filtered = product.filter((cur) => cur.id != id);
    setProduct(filtered);

    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + id)
      .catch((err) => {
        setError(err.message);
        setProduct(storeValue);
      });
  }

  function handleAdd() {
    const originalData = [...product];
    const addedData = { id: 0, name: "jeevan" };
    setProduct([addedData, ...product]);

    axios
      .post("https://jsonplaceholder.typicode.com/users/", addedData)
      .then(({ data: savedUser }) => setProduct([savedUser, ...product]))
      .catch((err) => {
        setError(err.message);
        setProduct(originalData);
      });
  }

  return (
    <>
      {error && <p className="text-danger container m-5">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mx-5 mt-5" onClick={() => handleAdd()}>
        Add
      </button>
      <ul className="list-group m-5">
        {product.map((cur) => (
          <li
            key={cur.id}
            className="list-group-item d-flex justify-content-between"
          >
            {cur.name}
            <button
              className="btn btn-outline-danger"
              onClick={() => handleClick(cur.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Category;
