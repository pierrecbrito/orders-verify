require('dotenv').config()

const USER_KEY = process.env.USER_KEY
const ENDPOINT = (index) => `https://api2.ploomes.com/Orders?$expand=Products&$top=300&$skip=${300*index}`

const options =  {
    method: "get",
    headers: { 
        "Content-Type": "application/json",
        "User-Key" : USER_KEY
    }
    
}

/**
 * @returns - Um array com as vendas
 */
async function getOrders() {
    let dados = []

    for (let index = 0; index < 1000; index++) {
        const response = await fetch(ENDPOINT(index), options);
        const responseJson = await response.json();

        if(responseJson.value.length == 0) 
            break
    
        responseJson.value.forEach(venda => dados.push({
            Numero: venda.OrderNumber,
            Cliente: venda.ContactName,
            Produtos: venda.Products,
            Total: venda.Amount,
            Desconto: venda.Discount,
            Mes: parseInt(venda.Date.substring(6, 7)),
            Criador: venda.CreatorId
        })) 
    }
 
    
    return dados
}

module.exports = {getOrders}