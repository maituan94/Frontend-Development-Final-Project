import React, { useEffect, useState } from "react";
import Table from "../Table";
import { getProducts } from "../../api/products";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();
      setProducts(response.data)
    }
    fetchData();
  }, []);

  console.log({products});

  return (
    <div>
      <Table
        type={"products"}
        headers={[
          "Product ID",
          "Product name",
          "Supplier ID",
          "Buying Price",
          "Selling Price",
          "Image",
          "Description",
          "Actions",
        ]}
        data={products}
      />
    </div>
  );
};

export default Products;
