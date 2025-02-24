const axios = require("axios");
require("dotenv").config();
let NOBITEX = process.env.NOBITEX;

//api
async function nobitex(){
    try {
        const response = await axios.get(NOBITEX);
        const nobitex_buy = response.data.bids[0];
        const nobitex_sell = response.data.asks[0];
        const nobitex_buy_amount = nobitex_buy[1];
        const nobitex_sell_amount = nobitex_sell[1];



        console.log("Nobitex Buy:", nobitex_buy);
        console.log("Nobitex Sell:", nobitex_sell);
        console.log("Nobitex buy amount:", nobitex_buy_amount);
        console.log("Nobitex Sell amount:", nobitex_sell_amount);


        return { nobitex_buy, nobitex_sell };

    } catch (error) {
        console.error(error);
    }
}

module.exports.nobitex = nobitex;
