let btnTest = document.getElementById("btnTest");

btnTest.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                let deckView = document.querySelector(".deckview");
                let rideDeckView = deckView.querySelectorAll(".row")[0];
                let mainDeckView = deckView.querySelectorAll(".row")[1];
                let deckImages = [];
                let rideDeck = [];
                let mainDeck = [];

                for (let cardContainer of deckView.querySelectorAll(".card-container")) {
                    let card = cardContainer.querySelector("img");

                    if (card.getAttribute("lazy") != "loaded") {
                        alert("Please scroll to the bottom of the page and try again.");
                        return;
                    }

                    let image = card.src;
                    image = image.substring(image.lastIndexOf("/") + 1);
                    deckImages.push({
                        name: image,
                        data: card.src
                    });
                }

                for (let cardContainer of rideDeckView.querySelectorAll(".card-container")) {
                    let card = cardContainer.querySelector("img");
                    let image = card.src;
                    image = image.substring(image.lastIndexOf("/") + 1);
                    rideDeck.push(image);
                }

                for (let cardContainer of mainDeckView.querySelectorAll(".card-container")) {
                    let card = cardContainer.querySelector("img");
                    let image = card.src;
                    image = image.substring(image.lastIndexOf("/") + 1);

                    for (let i = 0; i < Number(cardContainer.querySelector(".num").innerText); i++) {
                        mainDeck.push(image);
                    }
                }

                let result = {
                    deckImages: deckImages,
                    rideDeck: rideDeck,
                    mainDeck: mainDeck
                };

                let form = document.createElement("form");
                form.action = "http://localhost:8000";
                form.method = "post";
                form.enctype = "multipart/form-data";
                form.target = "_blank";
                let input = document.createElement("input");
                input.type = "hidden";
                input.name = "data";
                input.value = JSON.stringify(result);
                form.appendChild(input);
                document.body.appendChild(form);
                form.submit();
            }
        });
    }
});