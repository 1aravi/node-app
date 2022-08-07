// const express = require('express');
// const { MongoClient } = require('mongodb');
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env.MONGO_URL);

const app = express()
const PORT=4000;


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
const client = await createConnection();

app.get('/', function (req, res) {
  res.send('Hello World 🌍🌍')
})

//movies
app.get('/movies', async function (request, response) {
  const movies= await client.db("node-app").collection("movies").find({}).toArray();
    response.send(movies);
  })

  //movies id
  app.get('/movies/:id', async function (request, response) {
    //db.movies.find({})
    //cursor-pagination | cursor-> Array | toArray()

    const {id}=request.params;
    console.log(request.params, id);
    //db.movies.findOne({id: "101"})

    // const movie = movies.find((mv) => mv.id === id);
    const movie = await client.db("node-app").collection("movies").findOne({id: id});

    console.log(movie);
    movie ? response.send(movie): response.status(404).send({msg: "Movie not found"});
});

//middleware (inbuilt) - express.json it converts body into json data
app.post('/movies', async function (request, response) {
  const data=request.body;
  console.log(data);
  //db.movies.insertMany(data)

  const result = await client.db("node-app").collection("movies").insertMany(data);
response.send(result);
});

app.listen(PORT, ()=>console.log(`App started in ${PORT}`))