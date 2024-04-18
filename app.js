const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropDown = document.querySelectorAll(".drop-down select");
const btn = document.querySelector(".btn");
const input = document.querySelector(".selection input");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let selected;
let updateExchangeRate = async()=>{
    let amount = document.querySelector(".selection input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <= 0){
        amtVal = 1;
    }
    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);
    let msg = document.querySelector(".msg");
    msg.innerText = `${amtVal} ${fromCurr.value} = ${amtVal * rate} ${toCurr.value}`;
}
for(let select of dropDown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        if(select.name == "from" && currCode == "USD"){
            newOption.selected = "selected;"
        }
        else if(select.name == "to" && currCode == "INR"){
                 newOption.selected = "selected;"
             }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
       selected = select.name;
        updateFlag(evt.target);
    });
}
const updateFlag = (element)=>{
    let currCode = element.value;

    if(selected == "from")
    input.placeholder = `---${currCode}---`;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
});
window.addEventListener("load",()=>{
    updateExchangeRate();
})