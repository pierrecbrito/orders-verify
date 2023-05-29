require('dotenv').config()

const USER_KEY = process.env.USER_KEY
const ENDPOINT = "https://api2.ploomes.com/Orders?$expand=Products"

const options = {
    method: "get",
    headers: { 
        "Content-Type": "application/json",
        "User-Key" : USER_KEY
    }
    
}

/**
 * @returns - Um array com produtos ({nome, codigo, valor})
 */
async function getOrders() {
    let dados = []

    const response = await fetch(ENDPOINT, options);
    const responseJson = await response.json();

    console.log(responseJson.value)
    responseJson.value.forEach(venda => dados.push({
        Numero: venda.OrderNumber,
        Cliente: venda.ContactName,
        Produtos: venda.Products
    }))
    
    
    return dados
}

module.exports = {getOrders}