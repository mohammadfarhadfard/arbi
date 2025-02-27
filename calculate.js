const axios = require("axios");
require("dotenv").config();
let formatThousands = require("format-thousands");
const nobitex = require("./pricing/nobitex");
const wallex = require("./pricing/wallex");


async function calculate(){
  try{
    const nobitexResult = await nobitex.nobitex();
    const wallexResult = await wallex.wallex();


  }catch(error){
    console.log(error)
  }
}


calculate()
