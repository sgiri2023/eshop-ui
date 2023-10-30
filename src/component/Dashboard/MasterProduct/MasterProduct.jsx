import { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProductCategory from "./ProductCategory/ProductCategory";
import ProductSubCategory from "./ProductSubCategory/ProductSubCategory";
import ProductBrand from "./ProductBrand/ProductBrand";
import ProductModel from "./ProductModel/ProductModel";

class MasterProduct extends Component {
  constructor() {
    super();
    this.state = { data: "", activeKey: "category" };
  }
  render() {
    const { activeKey } = this.state;
    return (
      <div>
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => {
            this.setState({
              activeKey: k,
            });
          }}
          className="mb-3 horizoontal-tab"
        >
          <Tab eventKey="category" title="Category">
            <ProductCategory />
          </Tab>
          <Tab eventKey="subCategory" title="Sub Category">
            <ProductSubCategory />
          </Tab>
          <Tab eventKey="brand" title="Brand">
            <ProductBrand />
          </Tab>
          <Tab eventKey="model" title="Model">
            <ProductModel />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default MasterProduct;
