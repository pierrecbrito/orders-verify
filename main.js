const reader = require('./readOrders')

async function main() {
    let dados = await reader.getOrders()
    console.log(dados)
}

main()