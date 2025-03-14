const axios = require("axios");
require("dotenv").config();

async function NInventory() {
  try {
    //rls
    const optionsRls = {
      method: "POST",
      url: `https://api.nobitex.ir/users/wallets/balance`,
      headers: {
        Authorization: process.env.nobitex_token,
      },
      data: {
        currency: "rls",
      },
    };

    const responseRls = await axios(optionsRls);
    const nInventory_rls = responseRls.data.balance;
    //usdt
    const optionsUsdt = {
      method: "POST",
      url: `https://api.nobitex.ir/users/wallets/balance`,
      headers: {
        Authorization: process.env.nobitex_token,
      },
      data: {
        currency: "usdt",
      },
    };

    const responseUsdt = await axios(optionsUsdt);
    const nInventory_Usdt = responseUsdt.data.balance;

    // console.log(`Nobitex RLS Inventory: ${nInventory_rls}`);
    // console.log(`Nobitex USDT Inventory: ${nInventory_Usdt}`);

    return { nInventory_rls, nInventory_Usdt };

  } catch (error) {
    console.log(error);
  }
}

// NInventory()

module.exports.NInventory = NInventory;
