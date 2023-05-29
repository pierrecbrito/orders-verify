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

    if(dadosDaVenda.Discount != null)
        amountProducts -= ((dadosDaVenda.Discount / 100) * amountProducts) //Aplicando desconto sob total

    if(amount != amountProducts && Math.ceil(amountProducts) != Math.ceil(amount) && Math.floor(amountProducts) != Math.floor(amount)) console.log(`${amount} - ${amountProducts}`)

    return amount == amountProducts || Math.ceil(amountProducts) == Math.ceil(amount) || Math.floor(amountProducts) == Math.floor(amount)
}


module.exports = {verify}