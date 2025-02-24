const axios = require("axios");
require("dotenv").config();
const nobitex = require("./pricing/nobitex");
const tabdeal = require("./pricing/tabdeal");

const toman = `10000000`
const tether = `100`

async function calculate() {
    try {
        const nobitex_result = await nobitex.nobitex();
        const tabdeal_result = await tabdeal.tabdeal();

        //amount
        const nobitex_sell_amount = nobitex_result.nobitex_sell[1];
        const nobitex_buy_amount = nobitex_result.nobitex_buy[1];
        const tabdeal_sell_amount = tabdeal_result.tabdeal_sell[1];
        const tabdeal_buy_amount = tabdeal_result.tabdeal_buy[1];
        //price
        const nobitex_sell_price = nobitex_result.nobitex_sell[0] / 10;
        const nobitex_buy_price = nobitex_result.nobitex_buy[0] / 10;
        const tabdeal_sell_price = tabdeal_result.tabdeal_sell[0];
        const tabdeal_buy_price = tabdeal_result.tabdeal_buy[0];

        // Check if the amounts are greater than 100
        if (nobitex_sell_amount > 10 && tabdeal_sell_amount > 10 && nobitex_buy_amount > 10 && tabdeal_buy_amount > 10) {
            // console.log(true);
            //buy
            const lowest_buying_price = Math.min(nobitex_sell_price, tabdeal_sell_price);
            //sell
            const highest_selling_price = Math.max(nobitex_buy_price, tabdeal_buy_price);
            console.log(`lowest price for buy : ` , lowest_buying_price )
            console.log(`highest price for sell : ` , highest_selling_price )
        } else {
            console.log(false);
        }
    } catch (error) {
        console.error(error);
    }
}



calculate();