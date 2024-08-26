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

async function fetchMeaning(word) {
    try {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        let data = await fetch(url);
        let response = await data.json();
        let responseCount = response.length;
        console.log(response)
        // console.log(response[3].meanings.length)
        console.log(responseCount)
for (let j = 0; j < responseCount; j++) {
            synonymsArray.push(response[j].meanings[0].synonyms)
    }
    flattenArray = [].concat(...synonymsArray);
        console.log(flattenArray)
        audio = response[j].phonetics[j].audio;

        // for (let index = j; index < responseCount; index++) {
        //     for (let j = 0; j < response[index].meanings.length; j++) {
        //     if (response[index].meanings[j].partOfSpeech == "noun" && nounFound == false) {
        //         console.log(response[index].meanings[j].partOfSpeech)
        //         partOfSpeechArr.push(response[index].meanings[j].partOfSpeech)
        //         nounMeaning = response[index].meanings[j].definitions[0].definition
        //         partOfSpeechDefinationArr.push(nounMeaning)
        //         nounFound = true
        //         console.log(nounMeaning)
        //     }
        //     if (response[index].meanings[j].partOfSpeech == "verb" && verbFound == false) {
        //         console.log(response[index].meanings[j].partOfSpeech)
        //         partOfSpeechArr.push(response[index].meanings[j].partOfSpeech)
        //         verbMeaning = response[index].meanings[j].definitions[0].definition
        //         partOfSpeechDefinationArr.push(verbMeaning)
        //         verbFound = true
        //         console.log(verbMeaning)

        //     }
        //     if (response[index].meanings[j].partOfSpeech == "adverb" && adverbFound == false) {
        //         console.log(response[index].meanings[j].partOfSpeech)
        //         partOfSpeechArr.push(response[index].meanings[j].partOfSpeech)
        //         adverbMeaning = response[index].meanings[j].definitions[0].definition
        //         partOfSpeechDefinationArr.push(adverbMeaning)
        //         adverbFound = true
        //         console.log(adverbMeaning)
        //     }
        //     if (response[index].meanings[j].partOfSpeech == "adjective" && adjectiveFound == false) {
        //         console.log(response[index].meanings[j].partOfSpeech)
        //         partOfSpeechArr.push(response[index].meanings[j].partOfSpeech)
        //         adjectiveMeaning = response[index].meanings[j].definitions[0].definition
        //         partOfSpeechDefinationArr.push(adjectiveMeaning)
        //         adjectiveFound = true
        //         console.log(adjectiveMeaning)
        //     }
        // }}
        console.log(partOfSpeechDefinationArr)
        insertData(partOfSpeechArr,partOfSpeechDefinationArr)
    } catch (err) {
        // displayNotfound()
    }
}

document.getElementById("SearchBtn").addEventListener("click", () => {
    word = document.getElementById("inputField").value;
    partOfSpeechArr = []
    partOfSpeechDefinationArr = []
    verbFound = false
    nounFound = false
    adverbFound = false
    adjectiveFound = false
    data = ""
    document.getElementById("searchQueryBox").innerHTML = ""
    fetchMeaning(word);
});