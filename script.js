"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function () {
    const APIKey = "ytoM3bdzxQ7Ea6SnoEinoR4vp4a-O0xRSPSlx2qHt3A";
    const formEl = document.querySelector("form");
    const inputEl = document.getElementById("search-input");
    const searchResults = document.querySelector(".search-results");
    const showMore = document.getElementById("show-more-button");
    let inputData = "";
    let page = 1;
    formEl === null || formEl === void 0 ? void 0 : formEl.addEventListener("submit", e => {
        e.preventDefault();
        page = 1;
        searchImages();
    });
    showMore === null || showMore === void 0 ? void 0 : showMore.addEventListener("click", () => {
        searchImages();
    });
    function searchImages() {
        return __awaiter(this, void 0, void 0, function* () {
            inputData = inputEl.value;
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${APIKey}`;
            try {
                const res = yield fetch(url);
                const data = yield res.json();
                const results = data.results;
                if (page === 1) {
                    searchResults === null || searchResults === void 0 ? void 0 : searchResults.innerHTML = "";
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
                });
                page++;
                if (page > 1) {
                    showMore === null || showMore === void 0 ? void 0 : showMore.style.display = "block";
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
})();
