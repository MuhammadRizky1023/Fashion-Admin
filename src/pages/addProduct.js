import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/NewProduct.css";
import useRouter from "use-react-router";
import { useSelector } from "react-redux";
import axios from "axios";
const NewProducts = () => {
  const { history } = useRouter();


  const [productData, setProductData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    stock: '',
    category_id: 0,
  });

  const onChangeField = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(
        "http://localhost:8000/product",
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (request.data.code === 200) {
        alert("product has been successfully");
        history.push("/admin/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 
  return (
    <div className="form">
      <h1>New Product</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="title"
            onChange={onChangeField}
            value={productData.title}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="product description"
            name="description"
            onChange={onChangeField}
            value={productData.description}
          />
        </Form.Group>

        <Form.Group className="mb-3 image" >
          <div className="current-image">
            <div>current image:</div>
            <img
              alt=""
              style={{
                width: "100px",
                height: "150px",
                backgroundSize: "contain"
              }}
            />
          </div>
          <input
            type="file"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>stock</Form.Label>
          <Form.Control
            type='number'
            placeholder='product stock'
            name='stock'
            onChange={onChangeField}
            value={productData.stock}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
              <Form.Label>Product Price (in $)</Form.Label>
              <Form.Control
                type='number'
                placeholder='product price'
                name='price'
                onChange={onChangeField}
                value={productData.price}
              />
            </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="category"
            name="category_id"
            value={productData.category_id}
            onChange={onChangeField}
          >
            <option>Choose a category</option>
            <option value="1">Pakaian</option>
            <option value="2">Jam</option>
            <option value="3">Kacamata</option>
            <option value="4">Sepatu</option>
            <option value="5">Topi</option>
          </Form.Select>
        </Form.Group>

        <div className="buttons">
          <Link to={{ pathname: "/admin/" }}>
            <Button variant="danger" type="submit">
              Back
            </Button>
          </Link>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default NewProducts 

