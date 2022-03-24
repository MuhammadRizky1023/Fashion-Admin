import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import '../css/Homepage.css'
import { connect, useSelector } from 'react-redux';
import { getAllProducts } from '../states/action';
import { useEffect } from 'react';
import Product from '../components/Product';
const ProductList = ({ getAllProducts }) => {
  const { productShow } = useSelector((state) => state.productReducer)
  
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts, productShow]);
  return (
      <div className='home'>
        <Card>
          <Card.Header>List of Products</Card.Header>
          <Card.Body>
            <div className='products-headers'>
              <div className='product-name'>name</div>
              <div className='quantity'>quantity</div>
              <div className='price'>price</div>
              <div className='details'>details</div>
              <div className='remove'>Cancel</div>
          </div>
          {productShow&&
            productShow.length !== 0 &&
            Object.keys(productShow).length !== 0 ? (
              productShow.map((product) => {
                return <Product product={product} key={product.id} />;
              })
            ) : (
              <div>you have no products</div>
            )}
            <div className='new-product'>
              <Link to={{ pathname: '/admin/new-product' }}>
                <Button variant='primary' className='new-btn'>
                  New Product
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>

  );
};

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: () => dispatch(getAllProducts()),
})


export default connect(null, mapDispatchToProps)(ProductList)