const axios = require("axios");
require("dotenv").config();
let NOBITEX = process.env.NOBITEX;
let formatThousands = require("format-thousands");

async function nobitex() {
  try {
    const response = await axios.get(NOBITEX);
    const nobitex_buy = response.data.bids[0];
    const nobitex_sell = response.data.asks[0];

    // console.log(`nobitex buy price: ${formatThousands(nobitex_buy[0] / 10, ",")}, amount: ${nobitex_buy[1]}`);
    // console.log(`nobitex sell price: ${formatThousands(nobitex_sell[0] / 10 , ",")}, amount: ${nobitex_sell[1]}`);

        return { nobitex_sell , nobitex_buy };

  } catch (error) {
    console.log(error);
  }
}

module.exports.nobitex = nobitex;