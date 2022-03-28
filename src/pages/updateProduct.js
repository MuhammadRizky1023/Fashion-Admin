/** @format */

import React, { useState, useEffect, useRef } from "react";
import "../css/EditProducts.css";
import { Form, Button } from "react-bootstrap";
import { IKContext, IKUpload } from "imagekitio-react";
import { Link, useParams } from "react-router-dom";
import useRouter from "use-react-router";
import { useSelector } from "react-redux";
import axios from "axios";
const EditProduct = () => {
  const { id } = useParams();

  const [productData, setProductData] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    price: "",
    stock: "",
    category_id: ""
  });

  // useEffect(() => {
  //   const product = product.find((product) => {
  //     return product.id === id;
  //   });

  //   if (
  //     product && product.length > 0 &&
  //     Object.keys(product).length != 0
  //   ) {
  //     setProductData({
  //       id,
  //       title: product.title,
  //       description: product.description,
  //       image: product.image,
  //       price: product.price,
  //       image: product.image,
  //       product_id: product.id,

  //     })
  //   }
  // }, [product, id])

  const onChangeField = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };

 

  const onSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const request = await axios.post('http://localhost:8000/product/update-product',
    //     productData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('token')}`
    //       },
    //     },
    //   );
    //   if (request.data.code === 201) {
    //     alert('data has been updated successfully');
    //     history.push('/admin');
    //   }

    // } catch (error) {
    //   console.error(error.message);
    // }
  };

  const handleUpload = async (e) => {
    const formUpload = new FormData()
    const imageFile = e.target.files[0]
    formUpload.append('image', imageFile)

    try {
      const upload = await axios.post(`http://localhost:8000/upload`, formUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(upload)
      setProductData({
        ...productData,
        image: upload.data.data
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  
  return (
    <div className="form">
      <h1>Update Product</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="title"
            value={productData.title}
            onChange={onChangeField}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="product description"
            name="description"
            value={productData.description}
            onChange={onChangeField}
          />
        </Form.Group>

        <Form.Group className="mb-3 image" >
          <div className="current-image">
            <div>current image:</div>
            {productData.image && (
              <img
                alt=""
                style={{
                  width: "100px",
                  height: "150px",
                  backgroundSize: "contain"
                }}
                src={productData.image}
              />
            )}
          </div>
          <input
            type="file"
            onChange={(e) => handleUpload(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="product stock"
            name="stock"
            value={productData.stock}
            onChange={onChangeField}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="product price"
            name="price"
            value={productData.price}
            onChange={onChangeField}
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
            <option value="3">Kacamat</option>
            <option value="4">Sepatu</option>
            <option value="5">Topi</option>
          </Form.Select>
        </Form.Group>

        <div className="buttons">
          <Link to={{ pathname: "/" }}>
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
export default EditProduct;
