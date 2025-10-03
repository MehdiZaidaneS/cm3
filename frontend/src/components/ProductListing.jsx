import { Link } from "react-router-dom";

const ProductListing = ({ product }) => {
  return (
    <div className="job-preview">
      <Link to={`/products/${product.id}`}>
        <h2>{product.title}</h2>
      </Link>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stockQuantity}</p>
      <p>Supplier: {product.supplier.name}</p>
    </div>
  );
};

export default ProductListing;