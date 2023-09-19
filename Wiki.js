let searchEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');

//function for creating each result
function createAndAppendSearch(result) {
    
    // creating result items container
    let resultItemContainer = document.createElement('div');
    resultItemContainer.classList.add('result-item');
    searchResultsEl.appendChild(resultItemContainer);

    //create Title Element
    let {
        link,
        title,
        description
    } = result;
    let resultTitleEl = document.createElement('a');
    resultTitleEl.href = link;
    resultTitleEl.target = '_blank';
    resultTitleEl.classList.add('result-title');
    resultTitleEl.textContent = title;
    resultItemContainer.appendChild(resultTitleEl);

    //break element
    let titleBreak = document.createElement('br');
    resultItemContainer.appendChild(titleBreak);

    //url element
    let urlEl = document.createElement('a');
    urlEl.href = link;
    urlEl.target = '_blank';
    urlEl.classList.add('result-url');
    urlEl.textContent = link;
    resultItemContainer.appendChild(urlEl);

    //break element
    let urlBreak = document.createElement('br');
    resultItemContainer.appendChild(urlBreak);

    //create Description element
    let descriptionEL = document.createElement('p');
    descriptionEL.classList.add('link-description');
    descriptionEL.textContent = description;
    resultItemContainer.appendChild(descriptionEL);
}

function displayResult(searchResults) {
    spinner.classList.toggle('d-none');
    for (let result of searchResults) {
        createAndAppendSearch(result);
    }
}

function wikipediaSearch(event) {
    if (event.key === 'Enter') {
        spinner.classList.toggle('d-none');
        searchResultsEl.textContent = "";
        let searchValue = searchEl.value;
        let url = 'https://apis.ccbp.in/wiki-search?search=' + searchValue;
        let options = {
            method: 'GET'
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
}
searchEl.addEventListener('keydown', wikipediaSearch);