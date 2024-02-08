import { useEffect, useState } from "react";
import { Props } from "../services/user-services";
import { CanceledError } from "axios";
import userService from "../services/user-services";

  

const useUsers = ()=> {
    const [product, setProduct] = useState<Props[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
  
      const { request, cancel } = userService.getAll<Props>();
      request
        .then((res) => {
          setProduct(res.data), setIsLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
        });
  
      return () => cancel();
    }, []);

    return {product,error,isLoading,setProduct,setError}
}

export default useUsers;