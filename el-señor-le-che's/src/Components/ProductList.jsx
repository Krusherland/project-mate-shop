import { useState, useEffect } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import defaultImage from "../assets/mate.jpg";
import chocolateDonut from "../assets/chocolate-donut.png";
import rainbowDonut from "../assets/rainbow-donut.png";
import dulceDeLeChesDonut from "../assets/dulce-de-le-che-donut.png";
import capuccino from "../assets/capuccino.avif";
import macchiato from "../assets/macchiato.webp";
import mates from "../assets/mates.jpg";

const ProductList = () => {
  const urlBase = "http://localhost:8080/B-Mate-Store/products";
  const [products, setProducts] = useState([]);

  // Image mapping
  const imageMap = {
    "chocolate-donut.png": chocolateDonut,
    "rainbow-donut.png": rainbowDonut,
    "dulce-de-le-che-donut.png": dulceDeLeChesDonut,
    "capuccino.avif": capuccino,
    "macchiato.webp": macchiato,
    "mates.jpg": mates,
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(urlBase);
      console.log('Products received:', response.data);
      // Log image URLs to debug
      response.data.forEach(product => {
        console.log(`Product: ${product.name}, ImageURL: ${product.imageURL}`);
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    getProducts();
  };

  const getImageUrl = (imageURL) => {
    if (!imageURL) return defaultImage;
    
    // Extract just the filename from the path
    const filename = imageURL.split('/').pop();
    
    // Return the mapped image or default
    return imageMap[filename] || defaultImage;
  };

  return (
    <div className="container mt-5">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h1 className="title">Our Products</h1>
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productID}>
              <th scope="row">{product.productID}</th>
              <td>
                <img
                  src={getImageUrl(product.imageURL)}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  onError={(e) => { e.target.src = defaultImage; }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                <NumericFormat
                  value={product.price}
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="$"
                />
              </td>
              <td>
                <NumericFormat
                  value={product.stock}
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </td>
              <td>
                <Link
                  to={`/editProduct/${product.productID}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.productID)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
