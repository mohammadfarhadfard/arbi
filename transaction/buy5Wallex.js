const axios = require("axios");
require("dotenv").config();
const Atleast = process.env.Atleast;
const Maximum = process.env.Maximum;

const url = "https://api.wallex.ir/v1/account/orders";
const wallex = process.env.wallex_token;

const options = {
  method: "GET",
  url: url,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": wallex,
  },
  data: {
    symbol: "IRTUSDT",
    type: "MARKET",
    side: "BUY",
    price: "",
    quantity: process.env.AmountRequested2,
  },
};

async function buy5Wallex() {
  try {
      const { percentage, wallexPrice } = result;
      const wInventory_USDT = await WInventory();
      if (percentage > Atleast && percentage < Maximum && wInventory_USDT > 0) {
        options.data.price = wallexPrice;
        axios(options)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        if (percentage < Atleast || percentage > Maximum) {
          console.log(`percentage is not economical`);
        } else {
          console.log(`usdt inventory is not enough for sell to wallex`);
        }
      }
  } catch (error) {
    console.log(error);
  }
}
