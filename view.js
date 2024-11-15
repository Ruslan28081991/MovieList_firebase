import close from '/close.svg'

export class View {
    constructor({ 
        onNewMovie,
        deleteMovies,
        onClickMovie,
        deleteMovie
      }) {
        this.movieName = document.querySelector(".movie__input");
        this.movieBtn = document.querySelector(".movie__button");
        this.movieLists = document.querySelector(".movie__lists");
        this.clearMovies = document.querySelector(".movie__clear-btn");
        this.errorMessage = document.querySelector(".movie__error");

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
        this.movieName.addEventListener('input', () => {
            if(this.movieName.value.trim().length > 0) {
                this.errorMessage.innerHTML = ''
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
            this.errorMessage.innerHTML = 'Количество символов больше 50'
            return
        } else {
            const addLabel = document.createElement('label');
            addLabel.setAttribute('for', movie.id);
            addLabel.classList = 'movie__label';

            const addContainer = document.createElement('div')
            addContainer.classList = 'movie__label-container';
    
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

            const addCircle = document.createElement('span');
            addCircle.classList = 'movie__label-circle'
    
            const addText = document.createElement('p');
            addText.classList = 'movie__label-text';
            addText.innerText = movie.title;
            
            const addImg = document.createElement('img');
            addImg.classList = 'movie__label-close';
            addImg.src = `${close}`;
            addImg.onclick = () => {
                this.deleteMovie(movie.id)
            }
    
            addLabel.append(addContainer, addImg);
            addContainer.append(addInput, addCircle, addText)
            this.movieLists.append(addLabel);
        }
    }

    handleMovie = () => {
        this.errorMessage.innerText = ''
        const movieText = this.movieName.value.trim()
        if(!movieText) {
            this.errorMessage.innerText = 'Вы не написали название фильма';
            return
        }
  
        this.onNewMovie(movieText);
        this.movieName.value = ''
        this.movieName.focus();
    }

    deleteList = () => {
        this.deleteMovies();
    }
}