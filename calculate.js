const axios = require("axios");
require("dotenv").config();
const { Pool } = require("pg");
const nobitex = require("./pricing/nobitex");
const wallex = require("./pricing/wallex");
let formatThousands = require("format-thousands");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function insertData(profit, status, percentage) {
  try {
    await pool.query(
      `
      INSERT INTO profit_price (profit, status , percentage)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [profit, status, percentage]
    );
  } catch (error) {
    console.log(error);
  }
}

async function calculate() {
  try {
    const amountRequested = process.env.AmountRequested;
    const total = process.env.Total;
    const Percentages = {
      nobitex: process.env.Fee_nobitex,
      wallex: process.env.Fee_wallex,
    };

    const nobitexResult = await nobitex.nobitex();
    const wallexResult = await wallex.wallex();

    const { nobitex_sell, nobitex_buy } = nobitexResult;
    const { wallex_buy, wallex_sell } = wallexResult;

    if (nobitex_sell[1] > amountRequested && wallex_buy.quantity > amountRequested) {
      const nobitexPrice = amountRequested * (nobitex_sell[0] / 10);
      const wallexPrice = amountRequested * wallex_buy.price;
      const Disagreement = wallexPrice - nobitexPrice;
      const fee_nobitex = Percentages.nobitex * nobitexPrice;
      const fee_wallex = Percentages.wallex * wallexPrice;
      const allFee = fee_nobitex + fee_wallex;
      const Profit = Disagreement - allFee;
      const percentage = (Profit / total) * 100;

      console.log(`nobitex price: ${formatThousands(nobitexPrice, ",")}`);
      console.log(`wallex price: ${formatThousands(wallexPrice, ",")}`);
      console.log(`disagreement: ${formatThousands(Disagreement, ",")}`);
      console.log(`nobitex fee: ${formatThousands(fee_nobitex, ",")}`);
      console.log(`wallex fee: ${formatThousands(fee_wallex, ",")}`);
      console.log(`all fee: ${formatThousands(allFee, ",")}`);
      console.log(`profit: ${formatThousands(Profit, ",")}`);
      console.log(`percentage: ${percentage.toFixed(3)}%`);

      if (percentage > process.env.Atleast && percentage < process.env.Maximum) {
        console.log("Beneficial");
        await insertData(Profit, "Beneficial", percentage);
        return { percentage, wallexPrice, nobitexPrice };
      } else {
        console.log("Not Beneficial");
        return { percentage, wallexPrice, nobitexPrice };
      }
    } else {
      console.log(`not enough quantity`);
    }
    return {nobitex_buy , wallex_sell}
  } catch (error) {
    console.log(error);
  }
}

setTimeout(calculate, 0);


module.exports.calculate = calculate;