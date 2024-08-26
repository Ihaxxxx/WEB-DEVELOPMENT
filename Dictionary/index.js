let response;
let word;
let audio;
let partOfSpeech;
let partOfSpeechDefination;
let partOfSpeechArr = []
let partOfSpeechDefinationArr = []
let verbFound = false
let nounFound = false
let adverbFound = false
let adjectiveFound = false
let data ;
let synonymsArray= []
let antonymsArray= []
let synonymsflattenArray;
let antonymsflattenArray;
let synonymlistitems ; 
let antonymlistitems ; 

async function fetchMeaning(word) {
    try {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        let data = await fetch(url);
        response = await data.json();
        let responseCount = response.length;
        console.log(response)
        console.log(responseCount)
        audio = response[0].phonetics[0].audio;
        for (let index = 0; index < responseCount; index++) {
            synonymsArray.push(response[index].meanings[0].synonyms)
            antonymsArray.push(response[index].meanings[0].antonyms)
            console.log(response[index].meanings[0].antonyms)
            for (let j = 0; j < response[index].meanings.length; j++) {
            if (response[index].meanings[j].partOfSpeech == "noun" && nounFound == false) {
                console.log(response[index].meanings[0].partOfSpeech)
                partOfSpeechArr.push(response[index].meanings[j].partOfSpeech)
                nounMeaning = response[index].meanings[j].definitions[0].definition
                partOfSpeechDefinationArr.push(nounMeaning)
                nounFound = true
                console.log(nounMeaning)
            }
            if (response[index].meanings[j].partOfSpeech == "verb" && verbFound == false) {
                console.log(response[index].meanings[j].partOfSpeech)
                partOfSpeechArr.push(response[index].meanings[j].partOfSpeech)
                verbMeaning = response[index].meanings[j].definitions[0].definition
                partOfSpeechDefinationArr.push(verbMeaning)
                verbFound = true
                console.log(verbMeaning)

            }
            if (response[index].meanings[j].partOfSpeech == "adverb" && adverbFound == false) {
                console.log(response[index].meanings[j].partOfSpeech)
                partOfSpeechArr.push(response[index].meanings[j].partOfSpeech)
                adverbMeaning = response[index].meanings[j].definitions[0].definition
                partOfSpeechDefinationArr.push(adverbMeaning)
                adverbFound = true
                console.log(adverbMeaning)
            }
            if (response[index].meanings[j].partOfSpeech == "adjective" && adjectiveFound == false) {
                console.log(response[index].meanings[j].partOfSpeech)
                partOfSpeechArr.push(response[index].meanings[j].partOfSpeech)
                adjectiveMeaning = response[index].meanings[j].definitions[0].definition
                partOfSpeechDefinationArr.push(adjectiveMeaning)
                adjectiveFound = true
                console.log(adjectiveMeaning)
            }}
        }
        console.log(partOfSpeechDefinationArr)
        synonymsflattenArray = [].concat(...synonymsArray);
        antonymsflattenArray = [].concat(...antonymsArray);
        console.log(synonymsflattenArray,antonymsflattenArray)
        insertData(partOfSpeechArr,partOfSpeechDefinationArr,word)
    } catch (err) {
        console.log(err)
        // displayNotfound()
    }
}

document.getElementById("SearchBtn").addEventListener("click", fetchWord);

function fetchWord() {
    word = document.getElementById("inputField").value;
    partOfSpeechArr = []
    partOfSpeechDefinationArr = []
    verbFound = false
    nounFound = false
    adverbFound = false
    adjectiveFound = false
    data = ""
    value = ""
    list = ""
    synonymsArray = []
    synonymsflattenArray = []
    antonymsArray = []
    antonymsflattenArray = []
    antonymlistitems = ''
    synonymlistitems = ''
    document.getElementById("searchQueryBox").innerHTML = ""
    fetchMeaning(word);
}





function displayNotfound() {
    document.getElementById("searchQueryBox").innerHTML = `<h1 id="WordHeading">Word Not exist</h1>`
}

function insertData(partOfSpeechArr,partOfSpeechDefinationArr,word) {
    value = `<div class="heading"><h1 id="WordHeading">${word.toUpperCase()}</h1> <img id="soundBtn" src="sound.svg" alt="" srcset=""></div>`;
    for (let index = 0; index < partOfSpeechArr.length; index++) {
        value += `<div class="${partOfSpeechArr[index].charAt(0).toUpperCase()+partOfSpeechArr[index].slice(1)}"><h3>${partOfSpeechArr[index].toUpperCase()}</h3>
            <p id="${partOfSpeechArr[index]}-Meaning">${partOfSpeechDefinationArr[index]}</p>
        </div>`   
    }
    let synonymlistitems = synonymsflattenArray.map(word => `<li>${word}</li>`).join("");
    console.log(synonymlistitems)
    let synonymsClass = `<div id="Synonyms" class="Synonyms">
            <h3>Synonyms</h3>
            <ul>${synonymlistitems}
            </ul>
        </div> `


    
    antonymlistitems = antonymsflattenArray.map(word => `<li>${word}</li>`).join("");
    console.log(antonymlistitems)
    let antonymClass = `<div id="Antonyms" class="Antonyms">
            <h3>Antonyms</h3>
            <ul>${antonymlistitems}
            </ul>
        </div> `

    document.getElementById("searchQueryBox").innerHTML = value + synonymsClass + antonymClass
    document.getElementById("soundBtn").addEventListener("click", () => {
        var audiotoplay = new Audio(audio);
        audiotoplay.play();
    });    


    // adding event listeners to the Antonyns list
    Array.from(document.getElementById("Antonyms").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",()=>{
            document.getElementById("inputField").value = e.innerHTML
        })
    })

    // adding event listeners to the Synonym list
    Array.from(document.getElementById("Synonyms").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",()=>{
            document.getElementById("inputField").value = e.innerHTML
        })
    })
}