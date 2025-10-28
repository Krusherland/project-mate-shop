import ProductList from "./Components/ProductList";
import Nav from "./Components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";

function App() {
  return (
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
