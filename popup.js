let btnTest = document.getElementById("btnTest");

btnTest.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                let deckView = document.querySelector(".deckview");
                let deckViewRows = deckView.querySelectorAll(".row");
                let rideDeckView;
                let mainDeckView;
                let gDeckView;

                if (deckView.querySelector("div").innerText.includes("Ride")) {
                    rideDeckView = deckViewRows[0];
                    mainDeckView = deckViewRows[1];
                    gDeckView = deckViewRows[2];
                } else {
                    mainDeckView = deckViewRows[0];
                    gDeckView = deckViewRows[1];
                }
                
                let deckImages = [];
                let rideDeck = [];
                let mainDeck = [];
                let gDeck = [];

                for (let cardContainer of deckView.querySelectorAll(".card-container")) {
                    let card = cardContainer.querySelector("img");

                    if (card.getAttribute("lazy") != "loaded") {
                        alert("Please scroll to the bottom of the page and try again.");
                        return;
                    }

                    let image = card.src;
                    image = image.substring(image.lastIndexOf("/") + 1);

                    if (deckImages.find(i => i.data == card.src)) {
                        continue;
                    }

                    deckImages.push({
                        name: image,
                        data: card.src
                    });
                }

                if (rideDeckView) {
                    for (let cardContainer of rideDeckView.querySelectorAll(".card-container")) {
                        let card = cardContainer.querySelector("img");
                        let image = card.src;
                        image = image.substring(image.lastIndexOf("/") + 1);
                        rideDeck.push(image);
                    }
                }

                if (mainDeckView) {
                    for (let cardContainer of mainDeckView.querySelectorAll(".card-container")) {
                        let card = cardContainer.querySelector("img");
                        let image = card.src;
                        image = image.substring(image.lastIndexOf("/") + 1);
    
                        for (let i = 0; i < Number(cardContainer.querySelector(".num").innerText); i++) {
                            mainDeck.push(image);
                        }
                    }
                }

                if (gDeckView) {
                    for (let cardContainer of gDeckView.querySelectorAll(".card-container")) {
                        let card = cardContainer.querySelector("img");
                        let image = card.src;
                        image = image.substring(image.lastIndexOf("/") + 1);
    
                        for (let i = 0; i < Number(cardContainer.querySelector(".num").innerText); i++) {
                            gDeck.push(image);
                        }
                    }
                }

                let result = {
                    deckImages: deckImages,
                    rideDeck: rideDeck,
                    mainDeck: mainDeck,
                    gDeck: gDeck
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