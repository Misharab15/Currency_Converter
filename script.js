// Retrieving the HTML tags in Javascript file
const base_URL = "https://v6.exchangerate-api.com/v6/71d302ff631e71b4d6fdcac2/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const amount = document.querySelector(".amount input");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


// Displaying all countries in the options
 for(let select of dropdowns){
    for(currCode in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOptions.selected = "selected";
        } else if(select.name === "to" && currCode === "PKR"){
            newOptions.selected = "selected";
        }
        select.append(newOptions);
     }
    select.addEventListener("change", (evt) => {
        alterFlag(evt.target);
    })
 }


 // Displaying the country's flags accoridng to the selected country
 const alterFlag = (element) => {
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
 }


 //Checking that the amount for conversion must be greater than 1
 btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amtVal = amount.value;
    if(amtVal < 1 || amtVal ===""){
        amtVal = 1;
        amount.value = "1";
    }

    // fetching the currrent conversion rate from API
    const URL= `${base_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    
    let rate = data.conversion_rates[toCurr.value];
    console.log(rate);

    
    // Multiplying the current conversion rate with the desired amount of user
    let final1Amount = rate*amtVal;
    console.log(final1Amount);
    let final2Amount = parseFloat(final1Amount).toFixed(2);
    msg.innerText = `${amtVal}${fromCurr.value} = ${final2Amount}${toCurr.value}`;
    

 })

//  const updateCurr = async () => {
//     let amtVal = amount.value;
//     if(amtVal < 1 || amtVal ===""){
//         amtVal = 1;
//         amount.value = "1";
//     }

//     const URL= `${base_URL}/${fromCurr.value.toLowerCase()}.json`;
//     let response = await fetch(URL);
//     let data = await response.json();
//     console.log(data)
//     let rate = data[toCurr.value.toLowerCase()];
//     //console.log(rate.value);
//  }
