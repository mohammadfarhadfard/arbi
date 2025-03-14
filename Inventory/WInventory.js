const axios = require("axios");
require("dotenv").config();

async function WInventory() {
  try {
    const options = {
      method: "GET",
      url: `https://api.wallex.ir/v1/account/balances`,
      headers: {
        "X-API-Key": process.env.wallex_token,
      },
    };

    const response = await axios(options);
    const wInventory_USDT = response.data.result.balances.USDT.value;
    const wInventory_TMN = response.data.result.balances.TMN.value;
    // console.log(`wallex TMN Inventory: ${wInventory_TMN}`);
    // console.log(`wallex USDT Inventory: ${wInventory_USDT}`);
    return { wInventory_USDT , wInventory_TMN };
  } catch (error) {
    console.log(error);
  }
}

WInventory()

module.exports.WInventory = WInventory;
