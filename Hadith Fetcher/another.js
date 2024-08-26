async function fetchHadith() {
  let urlEng =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-abudawud.json";
  let urlUrdu =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/urd-abudawud.json";
  let urlArabic =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-abudawud.json";

  // fetching data in englsih
  let dataEng = await fetch(urlEng);
  let responseEng = await dataEng.json();

  // fetching data in englsih
  let dataUrdu = await fetch(urlUrdu);
  let responseUrdu = await dataUrdu.json();

  // fetching data in englsih
  let dataArabic = await fetch(urlArabic);
  let responseArabic = await dataArabic.json();

  console.log(responseEng);
  console.log(responseEng.metadata.sections);
  b = responseEng.metadata.section_details[1];
  console.log(b);

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
  console.log(responseEng.hadiths[hadithNumberBegin].text);
  console.log(responseUrdu.hadiths[hadithNumberBegin].text);
  console.log(responseArabic.hadiths[hadithNumberBegin].text);
}

fetchHadith();
