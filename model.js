import { v4 as uuidv4 } from 'uuid';

export class Model {
    constructor({ onMovieChange }) {
        this.isError = false;

        this.onMovieChange = onMovieChange;
    }

    addMovie( title ) {
        const movie = {
            title,
            isError: false,
            done: false,
            id: uuidv4()
        }

        if(this._isValid(title)) {
            this.isError = false;
            this.moviesIds.push(movie.id);
            this.moviesById[movie.id] = movie;
        } else {
            this.isError = true;
        }
   
        this.onMovieChange(movie, this.isError);
        return movie;
    }

    setMovies(movies) {
        this.moviesIds = [];
        this.moviesById = {};

        movies.forEach(movie => {
            this.moviesIds.push(movie.id),
            this.moviesById[movie.id] = movie
        });
    }

    getMovies() {
        return {
            moviesIds: this.moviesIds,
            moviesById: this.moviesById 
        };
    }

    toggleMovie(id) {
        this.moviesById[id].done = !this.moviesById[id].done;
    }

    getMovie(id) {
        return this.moviesById[id];
    }

    _isValid(title) {
        return title.length > 0 && title.length <= 50;
    }
}