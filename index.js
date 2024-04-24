
const inputEl = document.getElementById("input");
const infoTxtEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const exampleEl = document.getElementById("example");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {

    try {
        infoTxtEl.style.display = "block";
        meaningContainerEl.style.display = "none";

        infoTxtEl.innerText = `Searching the meaning of "${word}"...`
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result = await fetch(url).then((res) => res.json());

        if (result.title) {
            meaningContainerEl.style.display = "block";
            infoTxtEl.style.display = "none"
            titleEl.innerText = word;
            meaningEl.innerText = `"${result.title}"`;
            exampleEl.innerText = `"${result.title}"`;
            audioEl.style.display = "none";

        } else {
            infoTxtEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            exampleEl.style.display = "block";

            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            const examples = result[0].meanings.flatMap(meaning => meaning.definitions.map(definition => definition.example)).filter(example => example);

            if (examples.length > 0) {
                exampleEl.innerText = examples.map((example, index) => `${index + 1}-) ${example}`).join("\n");
            } else {
                exampleEl.innerText = "There are no examples for this word.";
            }

            if (result[0].phonetics.length > 0 && result[0].phonetics[0].audio) {
                audioEl.style.display = "inline-flex";
                audioEl.src = result[0].phonetics[0].audio;
            } else {
                audioEl.style.display = "none";
                audioEl.src = "";
            }
        }

    } catch (error) {
        console.log(error)
        infoTxtEl.innerText = `An error happened! Try again later.`
    }


}

inputEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (e.target.value.trim() !== "") {
            fetchAPI(e.target.value);
        } else {
            inputEl.value = "";
            infoTxtEl.style.display = "none";
            meaningContainerEl.style.display = "none";
            exampleEl.innerText = "";
            audioEl.src = "";
        }
    }
});
