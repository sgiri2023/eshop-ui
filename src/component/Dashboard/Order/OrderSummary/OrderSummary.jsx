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
          console.log("Asis: ", this.state.sellerProjectionXaxis);
          console.log("Data: ", this.state.sellerProjectionOrderDataSet);
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
          console.log("Asis: ", this.state.buyerProjectionXaxis);
          console.log("Data: ", this.state.buyerProjectionOrderDataSet);
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
    } = this.state;

    const { userDetails } = this.props;

    return (
      <div className="boxshadow_template_one">
        {/* <div className="d-flex">
          <p>Total Order: {totalOrder}</p>
          <p>Average Order: {averageOrder}</p>
          <OrderSummaryCard totalOrder={totalOrder} averageOrder={averageOrder} />
        </div> */}
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
        <h2>Seller Projection</h2>
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
        <h2>Buyer Projection</h2>
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
