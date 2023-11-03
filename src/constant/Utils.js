export const formatDate = (date, showTime = false, separator = "-") => {
  if (date instanceof Date && !isNaN(date)) {
    // Year
    const year = date.getFullYear();
    // Month
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    // Day
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;

    // let formatedDate = year + separator + month + separator + day;
    let formatedDate = day + separator + month + separator + year;
    if (showTime) {
      formatedDate += date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    return formatedDate;
  } else {
    throw new Error("Invalid date format given");
  }
};

export const readableDateFormat = (date, showTime = false, separator = "-") => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (date instanceof Date && !isNaN(date)) {
    // Year
    const year = date.getFullYear();
    // Month
    let month = date.getMonth();
    //month = month < 10 ? "0" + month : month;
    // Day
    let day = date.getDate();
    //day = day < 10 ? "0" + day : day;

    // let formatedDate = year + separator + month + separator + day;
    let formatDate = day + " " + monthNames[month] + ", " + year;

    return formatDate;
  } else {
    throw new Error("Invalid date format given");
  }
};

export const getInvoiceState = (invoiceState) => {
  if (invoiceState === "ORDER_PLACED") {
    return "Order Placed";
  } else if (invoiceState === "ORDER_PROCESSING") {
    return "Order Processing";
  } else if (invoiceState === "ORDER_SHIPPED") {
    return "Order Shipped";
  } else if (invoiceState === "ORDER_REACHED_NEAREST_HUB") {
    return "Reached to hub";
  } else if (invoiceState === "ORDER_OUT_FOR_DELIVERY") {
    return "Out for delivery";
  } else if (invoiceState === "ORDER_DELIVERED") {
    return "Delivered";
  } else if (invoiceState === "ORDER_SETTLED") {
    return "Completed";
  } else if (invoiceState === "ORDER_CANCELLED_REQUEST") {
    return "Cancel Request";
  } else if (invoiceState === "ORDER_CANCELLED") {
    return "Cancelled";
  } else {
    return invoiceState;
  }
};
