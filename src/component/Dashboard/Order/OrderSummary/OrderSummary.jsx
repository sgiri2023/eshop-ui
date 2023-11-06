import { Component } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "./../../../../axiosClient/eaxios";
import { LineChart } from "@mui/x-charts/LineChart";
import OrderSummaryCard from "./OrderSummaryCard";
import { connect } from "react-redux";

class OrderSummary extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      dataset: "",
      xAxis: ["Jan", "Feb", "March"],
      seriesData: [4, 5, 1],
      totalPriceList: [],
      totalOrder: 0,
      averageOrder: 0,
      sellerProjectionOrderDataSet: [],
      sellerProjectionPriceDataSet: [],
      sellerProjectionXaxis: [],

      buyerProjectionOrderDataSet: [],
      buyerProjectionPriceDataSet: [],
      buyerProjectionXaxis: [],

      productQuantityProjectionDataSet: [],
      productProjectionAaxis: [],
      histogramProduct: {
        modelName: [],
        quantity: [],
      },
      histogramProductModel: ["Jan", "Feb", "March"],
      histogramProductQuantity: [0, 0, 0],
    };
  }

  getTotalOrderCountMonthWiseDataset = () => {
    axios.get(`/api/invoice/dataset/monthwise`).then((res) => {
      this.setState(
        {
          xAxis: res.data.monthList,
          seriesData: res.data.invoiceCountList,
          totalPriceList: res.data.totalMonthPriceList,
          totalOrder: res.data.totalOrder,
          averageOrder: res.data.averageOrderPermonth,
        },
        () => {
          console.log("Asis: ", this.state.xAxis);
          console.log("Series: ", this.state.seriesData);
        }
      );
    });
  };

  getSellerOrderProjection = () => {
    axios.get(`/api/invoice/dataset/seller/monthwise`).then((res) => {
      let tempDataset = res.data.sellerDatasetList;
      let tempOrderData = [];
      let tempPriceData = [];
      tempDataset.map((dataset) => {
        let tempOrder = {};
        let tempPrice = {};
        tempOrder.label = dataset.label;
        tempOrder.data = dataset.invoiceCountList;

        tempPrice.label = dataset.label;
        tempPrice.data = dataset.totalMonthPriceList;

        tempOrderData.push(tempOrder);
        tempPriceData.push(tempPrice);
      });
      this.setState(
        {
          sellerProjectionXaxis: res.data.monthList,
          sellerProjectionOrderDataSet: tempOrderData,
          sellerProjectionPriceDataSet: tempPriceData,
        },
        () => {
          // console.log("Asis: ", this.state.sellerProjectionXaxis);
          // console.log("Data: ", this.state.sellerProjectionOrderDataSet);
        }
      );
    });
  };

  getBuyerOrderProjection = () => {
    axios.get(`/api/invoice/dataset/buyer/monthwise`).then((res) => {
      let tempDataset = res.data.sellerDatasetList;
      let tempOrderData = [];
      let tempPriceData = [];
      tempDataset.map((dataset) => {
        let tempOrder = {};
        let tempPrice = {};
        tempOrder.label = dataset.label;
        tempOrder.data = dataset.invoiceCountList;

        tempPrice.label = dataset.label;
        tempPrice.data = dataset.totalMonthPriceList;

        tempOrderData.push(tempOrder);
        tempPriceData.push(tempPrice);
      });
      this.setState(
        {
          buyerProjectionXaxis: res.data.monthList,
          buyerProjectionOrderDataSet: tempOrderData,
          buyerProjectionPriceDataSet: tempPriceData,
        },
        () => {
          // console.log("Asis: ", this.state.buyerProjectionXaxis);
          // console.log("Data: ", this.state.buyerProjectionOrderDataSet);
        }
      );
    });
  };

  getProductQuantityProjectionMonthwise = () => {
    axios.get(`/api/product/projection/monthwise`).then((res) => {
      let tempDataset = res.data.dataList;

      let histModelNameList = [];
      let histQuantityList = [];

      let tempQuantity = [];
      tempDataset.map((dataset) => {
        let tempPrice = {};

        tempPrice.label = dataset.label.slice(0, 6);
        tempPrice.data = dataset.productQuantityCountList;

        tempQuantity.push(tempPrice);

        let totalQuantity = dataset.productQuantityCountList.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        histModelNameList.push(dataset.label.slice(0, 6));
        histQuantityList.push(totalQuantity);
      });
      let histogramProduct = {
        modelName: histModelNameList,
        quantity: histQuantityList,
      };
      this.setState(
        {
          productQuantityProjectionDataSet: tempQuantity,
          productProjectionAaxis: res.data.monthList,
          histogramProduct,
          histogramProductModel: histModelNameList,
          histogramProductQuantity: histQuantityList,
        },
        () => {
          console.log("Product Asis: ", this.state.productProjectionAaxis);
          console.log("Product Data: ", this.state.productQuantityProjectionDataSet);
          console.log("Histogram of Product: ", this.state.histogramProduct);
        }
      );
    });
  };

  componentDidMount() {
    const { userDetails } = this.props;
    this.getTotalOrderCountMonthWiseDataset();
    if (userDetails.isAdmin === true) {
      this.getSellerOrderProjection();
      this.getBuyerOrderProjection();
    }
    if (userDetails.isCustomer === false) {
      this.getProductQuantityProjectionMonthwise();
    }
  }

  render() {
    const {
      xAxis,
      seriesData,
      totalPriceList,
      totalOrder,
      averageOrder,
      sellerProjectionOrderDataSet,
      sellerProjectionPriceDataSet,
      sellerProjectionXaxis,
      buyerProjectionOrderDataSet,
      buyerProjectionPriceDataSet,
      buyerProjectionXaxis,
      productQuantityProjectionDataSet,
      productProjectionAaxis,
      histogramProduct,
      histogramProductModel,
      histogramProductQuantity,
    } = this.state;

    const { userDetails } = this.props;

    return (
      <div className="boxshadow_template_one">
        {/* <div className="d-flex">
          <p>Total Order: {totalOrder}</p>
          <p>Average Order: {averageOrder}</p>
          <OrderSummaryCard totalOrder={totalOrder} averageOrder={averageOrder} />
    </div> */}
        <h2>Order Projection</h2>
        <div className="d-flex">
          <BarChart
            xAxis={[{ scaleType: "band", data: xAxis }]}
            series={[{ data: seriesData }]}
            width={500}
            height={300}
          />
          <LineChart
            width={500}
            height={300}
            series={[
              { data: seriesData, label: "Total Order No." },
              { data: totalPriceList, label: "Total Invoice Amount" },
            ]}
            xAxis={[{ scaleType: "point", data: xAxis }]}
          />
        </div>
        {userDetails.isAdmin === true && <h2>Seller Projection</h2>}
        {userDetails.isAdmin === true && (
          <div className="d-flex">
            <LineChart
              width={500}
              height={300}
              series={sellerProjectionOrderDataSet}
              xAxis={[{ scaleType: "point", data: sellerProjectionXaxis }]}
            />
            <LineChart
              width={500}
              height={300}
              series={sellerProjectionPriceDataSet}
              xAxis={[{ scaleType: "point", data: sellerProjectionXaxis }]}
            />
          </div>
        )}
        {userDetails.isCustomer === false && <h2>Product Quantity Projection</h2>}
        {userDetails.isCustomer === false && (
          <div className="d-flex">
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: histogramProductModel,
                },
              ]}
              series={[{ data: histogramProductQuantity }]}
              width={500}
              height={300}
            />
            <LineChart
              width={500}
              height={300}
              series={productQuantityProjectionDataSet}
              xAxis={[{ scaleType: "point", data: productProjectionAaxis }]}
            />
          </div>
        )}

        {userDetails.isAdmin === true && <h2>Buyer Projection</h2>}
        {userDetails.isAdmin === true && (
          <div className="d-flex">
            <LineChart
              width={500}
              height={300}
              series={buyerProjectionOrderDataSet}
              xAxis={[{ scaleType: "point", data: buyerProjectionXaxis }]}
            />
            <LineChart
              width={500}
              height={300}
              series={buyerProjectionPriceDataSet}
              xAxis={[{ scaleType: "point", data: buyerProjectionXaxis }]}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  return {
    userDetails: state.userDetails.userDetails,
  };
};

export default connect(mapStateToPros)(OrderSummary);
