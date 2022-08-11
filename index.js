// const express = require('express');
// const { MongoClient } = require('mongodb');
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {moviesRouter} from "./routes/movies.js"
import cors from "cors";

dotenv.config();
// console.log(process.env.MONGO_URL);



const app = express()
const PORT=process.env.PORT;

app.use(cors());

app.use(express.json());

// const MONGO_URL= 'mongodb://localhost';
// const MONGO_URL= "mongodb://127.0.0.1";
const MONGO_URL= process.env.MONGO_URL;

async function createConnection(){
  const client = new MongoClient(MONGO_URL)
  await client.connect();
  console.log("Mongo is connected");
  return client;
}
export const client = await createConnection();

app.get('/', function (req, res) {
  res.send('Hello World 🌍🌍')
})

app.use("/movies", moviesRouter)

app.listen(PORT, ()=>console.log(`App started in ${PORT}`))