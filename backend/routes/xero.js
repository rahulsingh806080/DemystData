const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const axios=require("axios")


const { errorLogger } = require("../helpers/logger");

const Joi = require("joi");

router.get("/", async (req, res) => {
  try {
   let url = process.env.XERO_API_URL+process.env.XERO_API_ENDPOINT;
   axios.get(url).then((response)=>{
    res.json(response.data);
  })
  
  } catch (err) {
    res.status(500).json({err:{
    message:"internal error"
    }});
  }
});




module.exports = router;
