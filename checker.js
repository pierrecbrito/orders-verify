const verify = (dadosDaVenda) => {
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

    if(ehLocacao(dadosDaVenda)) {
        if(!locacaoValida) {
            return false
        }
    }

    return amount == amountProducts || Math.ceil(amountProducts) == Math.ceil(amount) || Math.floor(amountProducts) == Math.floor(amount)
}

const ehLocacao = (venda) => {
    let servicosLocacao = venda.Produtos.filter(p => p.ProductName.includes('LOCAÇÃO') || p.ProductName.includes('PAGAMENTO MENSAL'))
    return servicosLocacao.length > 0
}

const locacaoValida = (venda) => {
    if(venda.Produtos.length < 3) 
        return false

    let servicosLocacao = venda.Produtos.filter(p => p.ProductName.includes('LOCAÇÃO') || p.ProductName.includes('PAGAMENTO MENSAL'))
    
    servicosLocacao.forEach(p => {if(p.Quantity == 1) { return false}})
    
    return true
}


module.exports = {verify}