
import userService, { Props } from "./services/user-services";
import useUsers from "./hooks/useUsers";


function Category() {
  const {product,isLoading,error,setProduct,setError}=useUsers()

  function handleDelete(id: number) {
    const storeValue = [...product];
    const filtered = product.filter((cur) => cur.id != id);
    setProduct(filtered);

    userService.delete(id).catch((err) => {
      setError(err.message);
      setProduct(storeValue);
    });
  }

  function handleAdd() {
    const originalData = [...product];
    const addedData = { id: 0, name: "jeevan" };
    setProduct([addedData, ...product]);

    userService
      .create(addedData)
      .then(({ data: savedUser }) => setProduct([savedUser, ...product]))
      .catch((err) => {
        setError(err.message);
        setProduct(originalData);
      });
  }

  function handleUpdate(curValue: Props) {
    const originalUser = [...product];
    const updateUser = { ...curValue, name: curValue.name + "!" };
    setProduct(
      product.map((cur) => (cur.id == curValue.id ? updateUser : { ...cur }))
    );

    userService.update(curValue.id,updateUser)
    .catch((error) => {
      setError(error.message);
      setProduct(originalUser);
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
            <div>
              <button
                className="btn btn-outline-dark mx-2"
                onClick={() => handleUpdate(cur)}
              >
                update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete(cur.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Category;
