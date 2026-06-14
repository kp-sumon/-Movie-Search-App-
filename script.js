// OMDb API Configuration (Free key included for you)
const API_KEY = "fc1fef96";
const BASE_URL = `https://www.omdbapi.com/?`;

async function searchMovie() {
    const input = document.getElementById('movieInput');
    const query = input.value.trim();
    
    // If search box is empty
    if (!query) {
        alert("Please enter a movie name!");
        return;
    }

    const loader = document.getElementById('loader');
    const resultArea = document.getElementById('movieResult');
    
    // Show loader and hide previous results
    loader.classList.remove('hidden');
    resultArea.classList.add('hidden');

    try {
        const response = await fetch(`${BASE_URL}t=${encodeURIComponent(query)}&apikey=${API_KEY}`);
        const data = await response.json();

        // Hide loader
        loader.classList.add('hidden');

        if (data.Response === "True") {
            // Binding data to HTML elements
            document.getElementById('movieTitle').textContent = data.Title;
            document.getElementById('movieYear').textContent = `💥 Released: ${data.Year}`;
            document.getElementById('ratingValue').textContent = data.imdbRating !== "N/A" ? data.imdbRating : "No Rating";
            document.getElementById('movieRuntime').textContent = `⏳ Runtime: ${data.Runtime}`;
            document.getElementById('moviePlot').textContent = data.Plot !== "N/A" ? data.Plot : "No description available for this movie.";
            document.getElementById('movieDirector').textContent = data.Director;
            document.getElementById('movieActors').textContent = data.Actors;

            // Checking Movie Poster
            const posterImg = document.getElementById('moviePoster');
            if (data.Poster && data.Poster !== "N/A") {
                posterImg.src = data.Poster;
                posterImg.classList.remove('hidden');
            } else {
                // Default image if no poster is found
                posterImg.src = "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500";
            }

            // Reveal result area
            resultArea.classList.remove('hidden');
        } else {
            alert("Sorry! No movie found with that name. Please check your spelling.");
        }

    } catch (error) {
        loader.classList.add('hidden');
        alert("Something went wrong with the server. Please try again!");
        console.error(error);
    }
}

// Allow searching by pressing the 'Enter' key
document.getElementById('movieInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchMovie();
    }
});

