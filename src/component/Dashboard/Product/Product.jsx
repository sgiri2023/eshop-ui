import { Component } from "react";
import ProductCard from "./ProductCard/ProductCard";
import axios from "./../../../axiosClient/eaxios";
import { Table, Button } from "react-bootstrap";

class Product extends Component {
  constructor() {
    super();
    this.state = { data: "", productList: [] };
  }
  getProductList = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        axios
          .get(`/api/product/get-product-list`)
          .then((res) => {
            console.log(".......Product List: ", res.data);
            this.setState({
              productList: res.data,
              isLoading: false,
            });
          })
          .catch((err) => {
            console.log("Error: ", err);
            this.setState({
              isLoading: false,
            });
          });
      }
    );
  };

  componentDidMount() {
    this.getProductList();
  }
  render() {
    const { productList } = this.state;
    return (
      <div>
        <Button>Add Product</Button>
        <div className="product-list-container">
          {productList.length > 0 &&
            productList.map((product, index) => (
              <div className="product-list-container" key={index}>
                <ProductCard key={index} product={product} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Product;
