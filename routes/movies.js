import express from "express";
import { getAllMovies, getMovieById, createMovies, deleteMovieById, updateMovieById } from "./helper.js";
const router = express.Router();

//movies
router.get('/', async function (request, response) {

    if (request.query.rating){
      request.query.rating= +request.query.rating;
    }
  
    console.log(request.query);
  
    const movies= await getAllMovies(request);
      response.send(movies);
    })
  
    //movies id
    router.get('/:id', async function (request, response) {
      //db.movies.find({})
      //cursor-pagination | cursor-> Array | toArray()
  
      const {id}=request.params;
      console.log(request.params, id);
      //db.movies.findOne({id: "101"})
  
      // const movie = movies.find((mv) => mv.id === id);
      const movie = await getMovieById(id);
  
      console.log(movie);
      movie ? response.send(movie): response.status(404).send({msg: "Movie not found"});
  });
  
  //middleware (inbuilt) - express.json it converts body into json data
  router.post('/', async function (request, response) {
    const data=request.body;
    console.log(data);
    //db.movies.insertMany(data)
  
    const result = await createMovies(data);
  response.send(result);
  });
  
  // movies delete
  router.delete('/:id', async function (request, response) {
  
    const {id}=request.params;
    console.log(request.params, id);
    //db.movies.deleteOne({id: "101"})
  
    // const movie = movies.find((mv) => mv.id === id);
    const result = await deleteMovieById(id);
  
    console.log(result);
    result.deletedCount > 0 ? response.send({msg: "Movie deleted successfully"}): response.status(404).send({msg: "Movie not found"});
  });
  
  //movies update
  router.put('/:id', async function (request, response) {
      const {id}=request.params;
      console.log(request.params, id);
      const data=request.body;
  
      //db.movies.updateOne({id: "101"}, {$set: data})
  
      const result = await updateMovieById(id, data);
      response.send(result);
  });

  export const moviesRouter = router;

