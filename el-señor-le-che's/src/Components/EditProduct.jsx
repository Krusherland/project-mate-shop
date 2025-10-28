import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const urlBase = "http://localhost:8080/B-Mate-Store/products";
  let navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const { name, price, stock, description } = product;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const response = await axios.get(`${urlBase}/${id}`);
    setProduct(response.data);
  };

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${urlBase}/${id}`, product);
    navigate("/");
  };
  return (
    <div className="container">
      <h1>Edit Product</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required={true}
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Product Price
          </label>
          <input
            type="number"
            step="any"
            className="form-control"
            id="price"
            name="price"
            required={true}
            value={price}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Product Stock
          </label>
          <input
            type="number"
            step="any"
            className="form-control"
            id="stock"
            name="stock"
            required={true}
            value={stock}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Product Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            required={true}
            value={description}
            onChange={(e) => onInputChange(e)}
          ></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Edit Product
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Go back
          </a>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
