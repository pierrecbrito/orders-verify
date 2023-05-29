require('dotenv').config()

const USER_KEY = process.env.USER_KEY
const ENDPOINT = "https://api2.ploomes.com/Orders?$expand=Products"

const options = {
    method: "get",
    body: {},
    headers: { 
        "Content-Type": "application/json",
        "User-Key" : USER_KEY
    }
    
}

/**
 * @returns - Um array com produtos ({nome, codigo, valor})
 */
async function ler() {
    let dados = []



    const response = await fetch(ENDPOINT, options);
    const responseJson = await response.json();

    console.log(responseJson.value)
    
    
    return dados
}
