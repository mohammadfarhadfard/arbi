const axios = require("axios");
require("dotenv").config();
let TABDEAL = process.env.TABDEAL_Route;

async function tabdeal() {
  try {
    const response = await axios.get(TABDEAL);
    const tabdeal_buy = response.data.bids[0];
    const tabdeal_sell = response.data.asks[0];
    const tabdeal_buy_amount = tabdeal_buy[1];
    const tabdeal_sell_amount = tabdeal_sell[1];


    console.log("Tabdeal Buy:", tabdeal_buy);
    console.log("Tabdeal Sell:", tabdeal_sell);
    console.log("Tabdeal buy amount:", tabdeal_buy_amount);
    console.log("Tabdeal Sell amount:", tabdeal_sell_amount);

    return { tabdeal_buy, tabdeal_sell };

  } catch (error) {
    console.log(error);
  }
}

module.exports.tabdeal = tabdeal;
