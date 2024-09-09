(function() {
    const APIKey: string = "ytoM3bdzxQ7Ea6SnoEinoR4vp4a-O0xRSPSlx2qHt3A";
    const formEl = document.querySelector("form") as HTMLFormElement;
    const inputEl = document.getElementById("search-input") as HTMLInputElement;
    const searchResults = document.querySelector(".search-results") as HTMLDivElement;
    const showMore = document.getElementById("show-more-button") as HTMLButtonElement;

    let inputData: string = "";
    let page: number = 1;

    formEl?.addEventListener("submit", e => {
        e.preventDefault();
        page = 1;
        searchImages();
    })

    showMore?.addEventListener("click", () => {
        searchImages();
    })


    async function searchImages() {
        inputData = inputEl.value;

        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${APIKey}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
    
            const results = data.results;
    
            if (page === 1) {
                searchResults?.innerHTML = "";
            }
    
            // create each result
            results.map(result => {
                const imageWrapper = document.createElement("div");
                imageWrapper.classList.add("search-result");

                const image = document.createElement("img");
                image.src = result.urls.small;
                image.alt = result.alt_description;

                const imageLink = document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target = "_blank";
                imageLink.textContent = result.alt_description;
    
                imageWrapper.appendChild(image);
                imageWrapper.appendChild(imageLink);
                searchResults.appendChild(imageWrapper);
            })
    
            page++;

            if (page > 1) {
                showMore?.style.display = "block";
            }

        } catch (err) {
            console.error(err);
        }
    }
})();