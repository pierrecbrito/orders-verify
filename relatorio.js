const reader = require('./readOrders')
const checker = require('./checker')
const escritor = require('./excrever')

async function main() {
    const meses = [4, 5, 6]
    let dados = await reader.getOrders()
    let vendasDeInteresse = dados.filter(venda => meses.includes(venda.Mes) && venda.Total > 700 && venda.Criador ==  40006135)
    vendasDeInteresse.forEach(venda => ajustarValores(venda))

    vendasDeInteresse.forEach(venda => {
        if(ehRecorrencia(venda)) {
            venda.Recorrencia = "Sim"
        } else {
            venda.Recorrencia = "Não"
        }
    })

    escritor.escrever(vendasDeInteresse)

}


const ehRecorrencia = venda => venda.Produtos.filter(produto => produto.ProductName.includes('PAGAMENTO MENSAL') 
|| produto.ProductName.includes('LOCAÇÃO') 
|| produto.ProductName.includes('MONITORAMENTO')
|| produto.ProductName.includes('SUPORTE MENSAL')).length > 0


const ajustarValores = (dadosDaVenda) => {
    if(ehRecorrencia(dadosDaVenda)) {
        let produtosDeRecorrencia = dadosDaVenda.Produtos.filter(produto => produto.ProductName.includes('PAGAMENTO MENSAL') 
                                    || produto.ProductName.includes('LOCAÇÃO') 
                                    || produto.ProductName.includes('MONITORAMENTO')
                                    || produto.ProductName.includes('SUPORTE MENSAL'))
        produtosDeRecorrencia.forEach(p => {
            if(p.Quantity != 12)
                p.Quantity = 12
                p.Total = 12 * p.UnitPrice
        })
    }

    let amount = dadosDaVenda.Total
    
    const reduce = (total, produto) =>  {
        let totalidade = produto.Total
        total += totalidade
        return total
    }

    let amountProducts = dadosDaVenda.Produtos.reduce(
        reduce,
        0
    );

    if(dadosDaVenda.Desconto != null && dadosDaVenda.Desconto != 0 ) {
        amountProducts -= (dadosDaVenda.Desconto / 100) * amountProducts      
     }

    let teste = amount == amountProducts || Math.ceil(amountProducts) == Math.ceil(amount) || Math.floor(amountProducts) == Math.floor(amount)
    
    if(!teste) {
        dadosDaVenda.Total = amountProducts
    }

}


main()