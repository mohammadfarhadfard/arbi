const axios = require("axios");
require("dotenv").config();
let formatThousands = require("format-thousands");
const nobitex = require("./pricing/nobitex");
const wallex = require("./pricing/wallex");
const Atleast = process.env.Atleast;
const Maximum = process.env.Maximum;

async function calculate() {
  try {
    let amountRequested = 250;
    let total = 50000000;

    const Percentages = {
      nobitex: process.env.Fee_nobitex,
      wallex: process.env.Fee_wallex,
    };

    const nobitexResult = await nobitex.nobitex();
    const wallexResult = await wallex.wallex();

    const nobitex_sell_amount = nobitexResult.nobitex_sell[1];
    const nobitex_sell_price = nobitexResult.nobitex_sell[0] / 10;

    const wallex_buy_amount = wallexResult.wallex_buy.quantity;
    const wallex_buy_price = wallexResult.wallex_buy.price;

    if (
      nobitex_sell_amount > amountRequested &&
      wallex_buy_amount > amountRequested
    ) {
      // console.log(true)
      let nobitexPrice = amountRequested * nobitex_sell_price;
      let wallexPrice = amountRequested * wallex_buy_price;
      let Disagreement = wallexPrice - nobitexPrice;
      let fee_nobitex = Percentages.nobitex * nobitexPrice;
      let fee_wallex = Percentages.wallex * wallexPrice;
      let allFee = fee_nobitex + fee_wallex;
      let Profit = Disagreement - allFee;

      function calPer(Profit, total) {
        const percentage = (Profit / total) * 100;
        return percentage.toFixed(3);
      }
      const percentage = calPer(Profit, total);

      console.log(`nobitex price : ${formatThousands(nobitexPrice, ",")}`);
      console.log(`wallex price : ${formatThousands(wallexPrice, ",")}`);
      console.log(`disagreement ${formatThousands(Disagreement, ",")}`);
      console.log(`nobitex fee : ${formatThousands(fee_nobitex, ",")}`);
      console.log(`wallex fee : ${formatThousands(fee_wallex, ",")}`);
      console.log(`all fee : ${formatThousands(allFee, ",")}`);
      console.log(`profit : ${formatThousands(Profit, ",")}`);
      console.log(`percentage : ${percentage}%`);

      if (percentage > Atleast && percentage < Maximum) {
        console.log("Beneficial")
        //buy fom nobitex and sell to wallex
      } else {
        console.log("Not Beneficial");
      }
    } else {
      console.log(false);
    }
  } catch (error) {
    console.log(error);
  }
}

calculate();
