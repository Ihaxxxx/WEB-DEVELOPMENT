// to waali currency ko base mein lo 
// from waali currenncy se multiply karo
let baseCurrency ;
let convertTo;
let rate ; 
let amount;
let currencyCode = []
let currencyName = []
let data ;
document.getElementById("ConvertBtn").addEventListener("click",()=>{
    amount = document.getElementById("AmountValue").value
    baseCurrency = document.getElementById("CurrencyFrom").value
    // console.log(baseCurrency)
    convertTo = document.getElementById("CurrencyTo").value
    calculateValue(baseCurrency,convertTo,amount)
})


async function calculateValue(baseCurrency,convertTo,amount) {
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`
    // console.log(baseCurrency)
    let data = await fetch(url)
    let response = await data.json()
    for (const key in response) {
        if (key == baseCurrency) {
            let a = response[key]
            for (const key in a) {
                if (key == convertTo) {
                    rate = a[key]
                }
            }
        }
    }
    document.getElementById("FinalValue").innerHTML = amount * rate
}


async function inserOptions(){
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
    console.log(baseCurrency)
    let data = await fetch(url)
    let response = await data.json()
    for (const key in response) {
        const element = response[key];
        if (element != "") {
            console.log(response[key],key)
            currencyCode.push(key)
            currencyName.push(response[key])
        }
    }
    currencyCode.sort()
    currencyName.sort()
    for (let index = 0; index < currencyCode.length; index++) {
        data += `<option value="${currencyCode[index]}">${currencyName[index]}</option>`
    }
    document.getElementById("CurrencyFrom").innerHTML = data
    document.getElementById("CurrencyTo").innerHTML = data
}


inserOptions()

// for (const key in object) {
//     if (Object.hasOwnProperty.call(object, key)) {
//         const element = object[key];
        
//     }
// }


