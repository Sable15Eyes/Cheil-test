const {Router} = require('express');
const router = Router();
const _ = require('underscore');

const movies = require('../sample.json');

// Metodo GET
router.get('/', (req, res) => {
    res.json(movies);
});

// Metodo POST
router.post('/', (req, res) => {
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating){
        const id = movies.length + 1;
        const newMovies = {...req.body, id};
        movies.push(newMovies);
        res.json(movies);
    }else{
        res.status(500).json({"Error": "Hubo un error"});
    }
});

// Metodo DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, i ) => {
        if(movie.id == id){
            movies.splice(i, 1);
        }
    });
    res.json(movies);
});

// Metodo PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating){
        _.each(movies, (movie, i ) => {
            if(movie.id == id){
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating= rating;
            }
        });
        res.json(movies);
    }else{
        res.status(500).json({"Error": "Hubo un error"});
    }
});

module.exports = router;