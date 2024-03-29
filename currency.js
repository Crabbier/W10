// jsondata = {

// }

// // jason to string
// strjs = JSON.stringify(jsondata)
// console.log(strjs); 

// //string to jason 
// console.log(JSON.parse(strjs))

currencies = {
}



function getCurrencies() {
    const API_KEY = "42945976ad1906cbb2e8a67c";
    let fromCurrencyField = document.querySelector("#from-currency").value;
    let currencieseElement = document.querySelector("#mult-cur");

    currency_codes = ["USD", "CLP", "RUB", "AUD", "MXN", "GBP", "INR", "MYR", "EUR"];

    url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrencyField}`;

    fetch(url, {
        method: 'get',
        headers: {
            'accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP error! Network response was not ok');
        }
    console.log(response.json);
    
    return response.json();
    })
    .then(data => {
        console.log("THIS IS THE GET CURRENCIES!");
        currencieseElement.innerHTML = "";
        for (let i=0; i < currency_codes.length; i++) {
            let divCurr = document.createElement("div");
            let myh1 = document.createElement("h1");
            let divAmount = document.createElement("div")
            let myCurrSymbol = document.createElement("h3")
            let myh3 = document.createElement("h3");
            let myFlag = document.createElement("img");

            
            divCurr.setAttribute("id", currency_codes[i]);
            divCurr.setAttribute("class", "currency_card");
            divAmount.setAttribute("class", "currency_amount");
            myCurrSymbol.setAttribute("id", `${currency_codes[i]}-symbol`);

            // myh1.setAttribute("id", currency_codes[i]);
            myh1.setAttribute("class", "currency_title");
            myFlag.setAttribute("id", currency_codes[i]+"-flag");
            
            
            myh3.textContent = `${data.conversion_rates[currency_codes[i]]}`;
            
            currencieseElement.appendChild(divCurr);
            // divCurr.appendChild(myh1);
            divCurr.appendChild(divAmount);
            divAmount.appendChild(myCurrSymbol);
            divAmount.appendChild(myh3);
            // let addinfo = getAdittionalInfo(currency_codes[i]);
            // console.log(addinfo);
            getAdittionalInfo(currency_codes[i])
            .then(result => {
                if (result) {
                    let flag = result.flag;
                    let symbol = result.symbol;
                    console.log(flag); // Do something with the flag value
                    let flagElement = document.querySelector(`#${currency_codes[i]}-flag`)
                    let symbolElement = document.querySelector(`#${currency_codes[i]}-symbol`);

                    symbolElement.textContent = `${symbol}`;

                    flagElement.setAttribute("src", flag);
                    flagElement.setAttribute("height", "40px");
                } else {
                    console.log("Currency not found");
                }
            })
            .catch(error => {
                console.error(error); // Handle errors if any
            });

            divCurr.appendChild(myFlag);
            currencies[currency_codes[i]] = data.conversion_rates[currency_codes[i]];
        };
        
        
    })
    .catch(error =>{
        console.error('There was a problem with the fetch operation:', error);
    });
}


function convertCurrency() {
    const API_KEY = "42945976ad1906cbb2e8a67c";
    let amount = document.querySelector("#amount").value;
    let fromCurrency = document.querySelector("#from-currency").value;
    let toCurrency = document.querySelector("#to-currency").value;
    let resultElement = document.querySelector("#result");

    url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`;
    
    console.log(url);

    fetch(url, {
        method: 'get',
        headers: {
            'accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP error! Network response was not ok');
        }
    console.log(response.json);
    
    return response.json();
    })
    .then(data => {
        console.log(data);
        let conversion_rate = data.conversion_rate;
        let conversion_result = data.conversion_result.toFixed(2);
        
        
        console.log(conversion_rate)
        console.log(conversion_result)

        let symbolValue = getAdittionalInfo(fromCurrency)
        .then(result => {
            if (result) {
                let flag = result.flag;
                let symbol = result.symbol;
                symbolValue = symbol;
                // console.log(symbolValue)
                
                return symbol

            } else {
                console.log("Currency not found");
            }
        })
        .catch(error => {
            console.error(error); // Handle errors if any
        });

        console.log(symbolValue)

        let htmlx = `<h1> Result: </h1> <h3>${symbolValue} ${conversion_result} =   </h3> <h1> Convertion Rate: </h1> 
        <h3>${conversion_rate}</h3>`;
        console.log(htmlx)
        resultElement.innerHTML = htmlx;
    })
    .catch(error =>{
        console.error('There was a problem with the fetch operation:', error);
    });
    
}

function getAdittionalInfo(currency,) {

    return fetch('json/currencies.json')
    .then(response => {
  
    return response.json();
    console.log(response.text);
    
    })
    .then(function(data) {
        // return data;
        for  (let i=0; i<data.length;i++) {
            
            if (data[i].Code == currency) {
                let flag = data[i].Flag;
                let symbol = data[i].Symbol;

                // let flagElement = document.querySelector(`#${currency}-flag`)
                // let symbolElement = document.querySelector(`#${currency}-symbol`);

                // symbolElement.textContent = `${symbol}`;

                // flagElement.setAttribute("src", flag);
                // flagElement.setAttribute("height", "40px");

                return {"flag" : flag, "symbol": symbol};

            }

        }

        return null;

    });
}

getCurrencies();