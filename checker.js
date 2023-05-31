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
        console.log(`Desconto: ${dadosDaVenda.Desconto} - Com Desconto: ${amountProducts}`)
    }
         //Aplicando desconto sob total

    if(amount != amountProducts && Math.ceil(amountProducts) != Math.ceil(amount) && Math.floor(amountProducts) != Math.floor(amount)) console.log(`${amount} - ${amountProducts}`)

    return amount == amountProducts || Math.ceil(amountProducts) == Math.ceil(amount) || Math.floor(amountProducts) == Math.floor(amount)
}


module.exports = {verify}