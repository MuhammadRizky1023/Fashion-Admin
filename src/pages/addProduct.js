import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { IKContext, IKUpload } from "imagekitio-react";
import { Link } from "react-router-dom";
import "../css/NewProduct.css";
import useRouter from "use-react-router";
import {  useSelector } from "react-redux";
import axios from "axios";
const NewProducts = () => {
  const { products} = useSelector((state) => state.productReucer)
  const { history } = useRouter();

  const [productData, setProductData] = useState({
    id: '',
    title:  '',
    description: '',
    image: '',
    price: '',
    stock: '',
    category_id: 0
  });

  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('choosen file')
  const [upload, setUpload] = useState()
  const [updoaldFile, setUploadFile] = useState({})
  const onChangeField = (e) => {
    setProductData({
      ...productData,
      [e.target.id]: e.target.value
    });

    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  };


 
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file)
    try {
      const request = await axios.post(
        'http://localhost:8000/product',
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
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

    try {
      const request = await axios.post('http://localhost:8000/post', productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      if (request.data.code === 200) {
        alert("image has been successfully");
        history.push("/admin/");

        const { fileName, filePath } = request.data;

        setUploadFile({ fileName, filePath });
  
      }

    } catch (error) {
      console.log(error.message);
    }
  };


  
  return (
    <div className="form">
      <h1>Add Product</h1>
      {products &&
        products.length !== 0 &&
        Object.keys(products).length !== 0 ? (
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
            className='custom-file-input'
            id='customFile'
          />
            <label className='custom-file-label' htmlFor='customFile'>
            {fileName}
          </label>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="product stock"
            name="stock"
            onChange={onChangeField}
            value={productData.stock}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Price (in $)</Form.Label>
          <Form.Control
            type="number"
            placeholder="product price"
            name="price"
            onCange={onChangeField}
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
          <Button variant="primary" type="submit" onSubmit={onSubmit}>
            Submit
          </Button>
        </div>
        </Form>
          ) : (
            <div>retrieving data</div>
          )}
    </div>
  );
};



export default NewProducts 
