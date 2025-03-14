const axios = require("axios");
require("dotenv").config();
const Atleast = process.env.Atleast;
const Maximum = process.env.Maximum;
const calculate = require("../calculate").calculate;
const NInventory = require("../Inventory/NInventory").NInventory;

const url = "https://api.nobitex.ir/market/orders/add";
const nobitex = process.env.nobitex_token;

const options = {
  method: "POST",
  url: url,
  headers: {
    Authorization: nobitex,
  },
  data: {
    type: "buy",
    execution: "market",
    srcCurrency: "usdt",
    dstCurrency: "rls",
    amount: process.env.AmountRequested,
    price: "",
  },
};

async function buyFromNobitex() {
  try {
    const result = await calculate();
    if (result) {
      const { percentage, nobitexPrice } = result;
      const nInventory_rls = await NInventory();
      if (percentage > Atleast && percentage < Maximum && nInventory_rls > 0) {
        options.data.price = nobitexPrice * 10;
        axios(options)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        if(percentage < Atleast || percentage > Maximum) {
          console.log(`percentage is not economical`)
        }else{
          console.log(`rls inventory is not enough for buy from nobitex`)
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

buyFromNobitex();
