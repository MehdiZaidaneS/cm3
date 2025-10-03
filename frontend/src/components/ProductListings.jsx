import { useEffect, useState } from "react";
import ProductListing from "./ProductListing";

const ProductListings = () => {
  const [products, setProducts] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Could not fetch the data for that resource");
        }
        const data = await res.json();
        setIsPending(false);
        setProducts(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="job-list">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {products && products.map((product) => (
        <ProductListing key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductListings;