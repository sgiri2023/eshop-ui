import { Component } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "./../../../../axiosClient/eaxios";
import { LineChart } from "@mui/x-charts/LineChart";

class OrderSummary extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
      dataset: "",
      xAxis: ["Jan", "Feb", "March"],
      seriesData: [4, 5, 1],
      totalPriceList: [],
    };
  }

  getTotalOrderCountMonthWiseDataset = () => {
    axios.get(`/api/invoice/dataset/monthwise`).then((res) => {
      this.setState(
        {
          xAxis: res.data.monthList,
          seriesData: res.data.invoiceCountList,
          totalPriceList: res.data.totalMonthPriceList,
        },
        () => {
          console.log("Asis: ", this.state.xAxis);
          console.log("Series: ", this.state.seriesData);
        }
      );
    });
  };

  componentDidMount() {
    this.getTotalOrderCountMonthWiseDataset();
  }

  render() {
    const { xAxis, seriesData, totalPriceList } = this.state;
    return (
      <div className="boxshadow_template_one d-flex">
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
    );
  }
}

export default OrderSummary;
