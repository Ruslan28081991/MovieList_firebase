import { Model } from "./model";
import { View } from "./view";
import { Firebase } from "./firebase";

export class Controller {
    constructor() {
        this.model = new Model({
            onMovieChange: this.handleModel
        });

        this.view = new View({
            onNewMovie: this.handleView,
            onClickMovie: this.handleClickTodo,
            deleteMovies: this.deleteWithFirebase,
            deleteMovie: this.deleteHandleMovie
        });

        this.firebase = new Firebase();
    }

    pullFirebase() {
        this.firebase.pull().then((movies) => {
            this.model.setMovies(movies);
            this.view.render(this.model.getMovies())
        })
    }

    handleModel = (movie, isError) => {
        this.view.createElement(movie, isError)
        this.view.render(this.model.getMovies()) 
        if(isError) {
            return
        } else {
            this.firebase.add(movie)
        }
    }

    handleView = (movie) => {
        this.model.addMovie(movie); 
    }

    handleClickTodo = (id) => {
        this.model.toggleMovie(id)
        this.firebase.update(this.model.getMovie(id))
    }

    deleteWithFirebase = () => {
        this.firebase.deleteAll(this.model.getMovies());
        this.model.setMovies([]); 
        this.view.render(this.model.getMovies())
    }

    deleteHandleMovie = (id) => {
        this.firebase.delete(id);
        this.pullFirebase()
        this.view.render(this.model.getMovies())
    }
}