const movies = [
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

const boughtMovies = [
    ["Lord of the Rings", "Spiderman 3"],
    ["Star Wars", "Inception", "Spiderman 3"]
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
        for (let j = 0; j < boughtMovies[i].length; j++) {
            tempTotal += checkPrice(movies, boughtMovies[i][j]);
        }
        console.log(tempTotal);
        tempTotal = 0;
    }
}

totalPrice(movies, boughtMovies);