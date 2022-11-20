import { useState } from "react";

import './MovieApp.css'


const movies_data = [
    {
        "title": "Lord of the Rings",
        "price": 28000
    },
    {
        "title": "Star Wars",
        "price": 24000
    },
    {
        "title": "Spiderman 3",
        "price": 15000
    },
    {
        "title": "Inception",
        "price": 32000
    },
]

function checkPrice(movies, movie) {
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].title === movie) {
            return movies[i].price;
        }
    }
}

function totalPrice(movies, boughtMovies) {
    let tempTotal = 0;

    for (let i = 0; i < boughtMovies.length; i++) {
        tempTotal += checkPrice(movies, boughtMovies[i].title) * boughtMovies[i].quantity;
    }

    return tempTotal;
}

function MovieApp() {
    const [movies, setMovies] = useState(movies_data);
    const [titleField, setTitleField] = useState("");
    const [priceField, setPriceField] = useState("");
    const [movieField, setMovieField] = useState(movies[0].title);
    const [selectedMovies, setSelectedMovies] = useState([]);

    function saveMovie() {
        if (titleField === '' && priceField === '') {
            alert("Masukkan semua data");
            return;
        }

        const movie = { "title": titleField, "price": parseFloat(priceField) };

        setMovies((previousMovies) => ([...previousMovies, movie]));
        setTitleField("");
        setPriceField("");
    }

    function addMovie() {
        let movie;
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].title === movieField) {
                movie = {
                    ...movies[i],
                    "quantity": 1
                }

                setSelectedMovies((previousMovies) => {
                    for (let j = 0; j < previousMovies.length; j++) {
                        if (previousMovies[j].title === movieField) {
                            previousMovies[j].quantity += 1;

                            return [...previousMovies];
                        }
                    }

                    return [...previousMovies, movie]
                })
                break;
            }
        }
    }

    return (
        <div className="movie-app">
            <h1>Movie App</h1>

            <div className="container">
                <div className="available-movies">
                    <h2>Movies Available</h2>
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                        </tr>
                        {movies.map(movie => {
                            return <tr>
                                <td>{movie.title}</td>
                                <td> {movie.price}</td>
                            </tr>
                        })}
                    </table>
                </div>

                <div className="pick-movie">
                    <h2>Pick A Movie</h2>
                    <div>
                        <label for='selectMovie'>
                            Pick a Movie:
                        </label>
                        <div className="movie-option">
                            <select id='selectMovie' value={movieField} onChange={(e) => setMovieField(e.target.value)}>
                                {movies.map(movie => {
                                    return <option value={movie.title}>{movie.title}</option>
                                })}
                            </select>
                            <button onClick={addMovie}>Add</button>
                        </div>
                    </div>
                    <div>
                        <p>Picked Movies</p>
                        <table>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                            </tr>
                            {selectedMovies.map((selectedMovie) => {
                                return <tr>
                                    <td>{selectedMovie.title}</td>
                                    <td> {selectedMovie.price}</td>

                                </tr>
                            })}
                            <tr>
                                <td>Harga Total: </td>
                                <td>{totalPrice(movies, selectedMovies)}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div className="add-movie">
                    <h2>Add Movie</h2>
                    <div>
                        <label className="label">Title:
                            <input type="text" value={titleField} onChange={(e) => setTitleField(e.target.value)} placeholder='Enter a movie title...' />
                        </label>
                    </div>

                    <div>
                        <label className="label">Price:
                            <input type="number" value={priceField} onChange={(e) => setPriceField(e.target.value)} placeholder='Enter the price...' />
                        </label>
                    </div>
                    <div>
                        <button onClick={saveMovie}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieApp;