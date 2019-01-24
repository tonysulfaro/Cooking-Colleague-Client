window.onload = function () {
    var input = document.getElementById('search_box');
    console.log(input)
    input.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("search_button").click();
        }
    });
}


function generateHome(search_term) {

    var url = 'https://api.edamam.com/search?q="chicken&app_id=d63abbc7&app_key=ad82d4418f075d5a656da60a47ad8246&from=0&to=3';
    var obj = ""

    var request = new XMLHttpRequest();

    request.onload = dumpResponse;
    // Initialize a request
    request.open('get', url)
    // Send it
    request.send()
    request.onloadend = function () {
        var spinner_result = document.getElementById("featured_spinner");
        if (spinner_result.style.display === "none") {
            spinner_result.style.display = "block";
        } else {
            spinner_result.style.display = "none";
        }
    }

    function dumpResponse() {
        // `this` will refer to the `XMLHTTPRequest` object that executes this function
        obj = JSON.parse(this.responseText);
        console.log(obj);

        for (i = 0; i < 3; i++) {
            console.log(obj.hits[i].recipe.label);
        }

        let featured_container = document.getElementById("featured_container");

        let count = 0;
        let previews = `<div class="row">`;

        for (var i = 0; i < 3; i++) {
            console.log(JSON.stringify(obj.hits[i].recipe.url))
            console.log(JSON.stringify(obj.hits[i].recipe.image));

            let recipe_url = (obj.hits[i].recipe.url);
            let recipe_label = JSON.stringify(obj.hits[i].recipe.label);
            let recipe_pic = obj.hits[i].recipe.image;
            let recipe_calories = obj.hits[i].recipe.calories;
            let recipe_time = obj.hits[i].recipe.totalTime;

            if (count < 3) {
                previews = previews + `<div class="col-md-4">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="width: 18rem;">
                        <img src="` + recipe_pic + `" height="180" class="img-food-card">
                        <div class="card-body">
                            <h5 class="card-title">` + recipe_label + `</h5>
                            <p class="card-text">Time: ` + recipe_time + ` minutes.</p>
                            <p class="card-text">` + parseInt(recipe_calories) + ` Calories.</p>
                            <button onclick=window.open('` + recipe_url + `','_blank') class="btn btn-secondary">Start</a>
                        </div>
                    </div>
                </div>`;

            } else {
                previews = previews + `</div><div class="row"><div class="col-md-4">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="width: 18rem;">
                        <img src="https://img.huffingtonpost.com/asset/5c4344752400003801486921.jpeg" height="180" class="img-food-card">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Time: ` + recipe_time + ` minutes.</p>
                            <p class="card-text">` + parseInt(recipe_calories) + ` Calories.</p>
                            <button class="btn btn-secondary">Start</button>
                        </div>
                    </div>
                </div>`;
            }

        }
        featured_container.insertAdjacentHTML('beforeend', previews);
        console.log(featured_container);
    }
}

function generateRecipieResults(search_term) {
    console.log("generating view");

    let search_thing = document.getElementById("search_box").value;
    localStorage.setItem("search_query", search_thing);
    console.log(search_thing)

    // remove all stuff
    var myNode = document.getElementById("main_container");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    let featured_container = document.getElementById("main_container");
    let parts = `<br>
        <br>
        <br>
        <br>

        <div id="search_results" class="container">
            <h1 id="search_header">Search Results For: ` + search_thing + `</h1>
            <br>
            <div id="results_spinner" class="text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>`;
    featured_container.insertAdjacentHTML('beforeend', parts);
    populate_search_results(search_thing);
}

function populate_search_results(search_thing) {

    var url = 'https://api.edamam.com/search?q=' + search_thing + '&app_id=d63abbc7&app_key=ad82d4418f075d5a656da60a47ad8246&from=0&to=12';
    var obj = ""

    var request = new XMLHttpRequest();

    request.onload = dumpResponse;
    // Initialize a request
    request.open('get', url)
    // Send it
    request.send()
    request.onloadend = function () {
        var spinner_result = document.getElementById("results_spinner");
        if (spinner_result.style.display === "none") {
            spinner_result.style.display = "block";
        } else {
            spinner_result.style.display = "none";
        }
    }

    function dumpResponse() {
        // `this` will refer to the `XMLHTTPRequest` object that executes this function
        obj = JSON.parse(this.responseText);
        console.log(obj);

        for (i = 0; i < 3; i++) {
            //console.log(obj[i].url);
        }

        var featured_container = document.getElementById("search_results");

        let count = 0;
        let previews = `<div class="row">`;

        for (var i = 0; i < 12; i++) {
            //console.log(JSON.stringify(obj[i].url))
            //console.log(JSON.stringify(obj[i].image));

            let recipe_url = (obj.hits[i].recipe.url);
            let recipe_label = JSON.stringify(obj.hits[i].recipe.label);
            let recipe_pic = obj.hits[i].recipe.image;
            let recipe_calories = obj.hits[i].recipe.calories;
            let recipe_time = obj.hits[i].recipe.totalTime;

            if (count < 3) {
                previews = previews + `<div class="col-md-4">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="width: 18rem;">
                        <img src="` + recipe_pic + `" height="180" class="img-food-card">
                        <div class="card-body">
                            <h5 class="card-title">` + recipe_label + `</h5>
                            <p class="card-text">Time: ` + recipe_time + ` minutes.</p>
                            <p class="card-text">` + parseInt(recipe_calories) + ` Calories.</p>
                            <button onclick=window.open('` + recipe_url + `','_blank') class="btn btn-secondary">Start</button>
                        </div>
                    </div>
                </div>`;

            } else {
                previews = previews + `</div><div class="row"><div class="col-md-4">
                    <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="width: 18rem;">
                        <img src="https://img.huffingtonpost.com/asset/5c4344752400003801486921.jpeg" height="180" class="img-food-card">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Time: ` + recipe_time + ` minutes.</p>
                            <p class="card-text">` + parseInt(recipe_calories) + ` Calories.</p>
                            <button class="btn btn-secondary">Start</button>
                        </div>
                    </div>
                </div>`;
            }

        }
        featured_container.insertAdjacentHTML('beforeend', previews);
        console.log(featured_container);
    }



}
