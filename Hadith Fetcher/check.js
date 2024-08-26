let data = "";
let hadithTopicNumber = "";
let responseEng;
let responseUrdu;
let responseArabic;
let topicName;
let hadithNumberEnd;
let hadithNumberBegin;
let recentSearches = []
async function fetchHadith(Author) {
    let urlEng =
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-${Author}.json`
    let urlUrdu =
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/urd-${Author}.json`
    let urlArabic =
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${Author}.json`

    // fetching data in englsih
    let dataEng = await fetch(urlEng);
    responseEng = await dataEng.json();

    // fetching data in englsih
    let dataUrdu = await fetch(urlUrdu);
    responseUrdu = await dataUrdu.json();

    // fetching data in englsih
    let dataArabic = await fetch(urlArabic);
    responseArabic = await dataArabic.json();

    document.getElementById("topicsTable").innerHTML = `<ul id="topics" class="topicsList"></ul>`

    console.log(responseEng);

    // FECTCHING THE TOPICS
    a = await responseEng.metadata.sections;
    data = "";
    for (const key in a) {
        if (Object.hasOwnProperty.call(a, key)) {
            // console.log(typeof key);
            const element = a[key];
            if (key != 0) {
                data += `<li class="list"><a href="#">${key} ${element}</a></li>`;
            }
        }
    }
    document.getElementById("topics").innerHTML = data;


    // Creating the recent searches bar
    // recent Search is an array
    // seach query isss the value in the input box

    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            topicName = (event.target.innerText);
            hadithTopicNumber = (topicName.split(" ")[0])
            hadithTopicFetcher(hadithTopicNumber)
            searchQuery = document.getElementById("topicNoInput").value
            recentSearches.push(searchQuery)
            localStorage.setItem(Author,recentSearches)
            if (recentSearches.length > 4  ) {
                var parentDiv = document.getElementById('recentSearches');
                var firstChildDiv = parentDiv.firstElementChild;
                parentDiv.removeChild(firstChildDiv);
                recentSearches.shift()
                // console.log(recentSearches)
            }if (recentSearches.length <= 4 && searchQuery != "" ) {
                const div = document.createElement("div");
                const text = document.createTextNode(searchQuery);
                div.appendChild(text)
                const element = document.getElementById("recentSearches")
                element.appendChild(div);
                
            }
        }
        );
    });

    function recentSeachersToLocalStorage(recentSearches) {
        console.log(recentSearches)
        if (recentSearches.length == 4) {
            recentSearches.shift()

        }
    }



    // Hadith inserter 
    async function hadithTopicFetcher(hadithTopicNumber) {
        b = responseEng.metadata.section_details[hadithTopicNumber];
        let count = 1;
        for (const key in b) {
            if (Object.hasOwnProperty.call(b, key)) {
                const element = b[key];
                if (count == 1) {
                    hadithNumberBegin = element;
                    console.log(hadithNumberBegin);
                } else if (count == 2) {
                    hadithNumberEnd = element;
                    console.log(hadithNumberEnd);
                }
                count++;
            }
        }

        // let randomHadithGenerator = 1
        let randomHadithGenerator = Math.floor(Math.random() * (hadithNumberEnd - hadithNumberBegin + 1)) + hadithNumberBegin;




        let eng = (responseEng.hadiths[randomHadithGenerator].text);
        let urdu = (responseUrdu.hadiths[randomHadithGenerator].text);
        let arabic = (responseArabic.hadiths[randomHadithGenerator].text);

        document.getElementById("Arabic").innerHTML = arabic
        document.getElementById("English").innerHTML = eng
        document.getElementById("Urdu").innerHTML = urdu
    }
}


// if click on recent search then input the value in the input box

document.getElementById("recentSearches").addEventListener("click",()=>{
    Array.from(document.getElementById("recentSearches").getElementsByTagName('div')).forEach(e =>{
      e.addEventListener("click",()=>{
        console.log(e.innerHTML)
        document.getElementById('topicNoInput').value = e.innerHTML
        myFunction()
        
      })})
})

//

document.getElementById("searchBtnAuthor").addEventListener("click", () => {
    Author = document.getElementById("Author").value
    document.getElementById("Arabic").innerHTML = ""
    document.getElementById("English").innerHTML = ""
    document.getElementById("Urdu").innerHTML = ""
    document.getElementById("topicInputBox").style.display = "block"
    document.getElementById("recentSearches").innerHTML = ""
    document.getElementById("topicNoInput").value = ""
    document.getElementById("topicsTable").innerHTML = `<div class="loader"></div>`
    fetchHadith(Author)

})