const reader = require('./readOrders')
const checker = require('./checker')

async function main() {
    let dados = await reader.getOrders()

    dados.forEach(venda => {
        if(!checker.verify(venda)) {
            console.log('Venda sem integridade:')
            console.log(`${venda.Numero} - ${venda.Cliente}`) 
        }
    })
}

main()