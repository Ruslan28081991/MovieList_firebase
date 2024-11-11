import close from '/close.svg'

export class View {
    constructor({ 
        onNewMovie,
        deleteMovies,
        onClickMovie,
        deleteMovie
      }) {
        this.movieName = document.getElementById('movieName');
        this.movieBtn = document.getElementById("movieBtn");
        this.movieLists = document.querySelector(".movie__lists");
        this.clearMovies = document.getElementById('clearBtn');
        this.errorMessage = document.querySelector(".error");

        this.onNewMovie = onNewMovie;
        this.deleteMovies = deleteMovies;
        this.onClickMovie = onClickMovie;
        this.deleteMovie = deleteMovie;

        this.movieBtn.addEventListener('click', this.handleMovie);
        this.clearMovies.addEventListener('click', this.deleteList);

        this.movieName.addEventListener('keydown', (e) => {
            if(e.key === "Enter") {
                this.handleMovie()
            }
        })
    }

    render({ moviesIds, moviesById }) {
        this.movieLists.innerHTML = '';

        moviesIds.forEach(id => {
            this.createElement(moviesById[id]);
        })
    }

    
    

    createElement(movie, isError) {
        if(isError) {
            return
        } else {
            const addLabel = document.createElement('label');
            addLabel.setAttribute('for', movie.id);
            addLabel.classList = 'movie__label';
    
            const addInput = document.createElement('input');
            addInput.classList = 'movie__label-input';
            addInput.setAttribute('type', 'checkbox');
            addInput.setAttribute('id', movie.id);

            if(movie.done) {
                addInput.setAttribute('checked', true);
                if(addInput.checked) {
                    addLabel.className = 'selected'
                } else {
                    addLabel.className = 'movie__label'
                }
            };

            addInput.onclick = () => {
                if(addInput.checked) {
                    addLabel.className = 'selected'
                } else {
                    addLabel.className = 'movie__label'
                }
                this.onClickMovie(movie.id);
            };
    
            const addText = document.createElement('p');
            addText.classList = 'movie__label-text';
            addText.innerText = movie.title;
            
            const addImg = document.createElement('img');
            addImg.classList = 'movie__label-close';
            addImg.src = `${close}`;
            addImg.onclick = () => {
                this.deleteMovie(movie.id)
            }
    
            addLabel.append(addInput, addText, addImg);
            this.movieLists.append(addLabel);
        }
    }

    handleMovie = () => {
        const movieText = this.movieName.value;
        this.onNewMovie(movieText);
        this.movieName.value = ''
        this.movieName.focus();
    }

    deleteList = () => {
        this.deleteMovies();
    }
}