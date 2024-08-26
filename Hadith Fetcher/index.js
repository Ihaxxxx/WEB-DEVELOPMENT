let data = "";
let hadithTopicNumber = "";
let responseEng ;
let responseUrdu;
let responseArabic ;
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

    console.log(responseEng);
  //   console.log(responseEng.metadata.sections);

  //   console.log(b);

  // FECTCHING THE TOPICS
  a = await responseEng.metadata.sections;
  data = "";
  for (const key in a) {
    if (Object.hasOwnProperty.call(a, key)) {
      // console.log(typeof key);
      const element = a[key];
      if (key != 0) {
        data += `<p>${key} ${element}</p>`;
      }
    }
  }
  document.getElementById("topicInputBox").innerHTML = `<div class="InputBox"><input id="topicNoInput" class="topicInput" type="text" placeholder="enter the Topic Number of the Hadith">
  <input id="searchBtnTopics" type="button" value="Search"></div>
  <div id="topics" class="topicsList">
  </div>`;

  document.getElementById("topics").innerHTML = data;
  
  document.getElementById("searchBtnTopics").addEventListener("click", () => {
  hadithTopicNumber = document.getElementById("topicNoInput").value;
    // console.log(typeof hadithTopicNumber);
    hadithTopicFetcher(hadithTopicNumber)
  });
}



async function hadithTopicFetcher(hadithTopicNumber) {
  b = responseEng.metadata.section_details[hadithTopicNumber];
  let count = 1;
  for (const key in b) {
    if (Object.hasOwnProperty.call(b, key)) {
      const element = b[key];
      if (count == 1) {
        let hadithNumberBegin = element;
        console.log(hadithNumberBegin);
      } else if (count == 2) {
        let hadithNumberEnd = element;
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

let count = 1
// Add Event Listener to buttons
document.getElementById("searchBtnAuthor").addEventListener("click", ()=>{
  Author = document.getElementById("Author").value
  document.getElementById("Arabic").innerHTML = ""
  document.getElementById("English").innerHTML = ""
  document.getElementById("Urdu").innerHTML = ""
  fetchHadith(Author)
})






