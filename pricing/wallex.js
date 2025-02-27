const axios = require("axios");
require("dotenv").config();
let WALLEX = process.env.WALLEX_Route;
let formatThousands = require("format-thousands");

async function wallex() {
  try {
    const response = await axios.get(WALLEX);
    const wallex_buy = response.data.result.bid[0];
    const wallex_sell = response.data.result.ask[0];

    console.log(`wallex buy price: ${formatThousands(wallex_buy.price, ",")}, amount: ${wallex_buy.quantity}`);
    console.log(`wallex sell price: ${formatThousands(wallex_sell.price, ",")}, amount: ${wallex_sell.quantity}`);

  } catch (error) {
    console.log(error);
  }
}

module.exports.wallex = wallex;