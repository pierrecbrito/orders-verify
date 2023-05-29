const verify = (dadosDaVenda) => {
    let amount = dadosDaVenda.Total
    
    const reduce = (total, produto) =>  {
        let totalidade = produto.Quantity * produto.UnitPrice
        let desconto = produto.Discount/100 * totalidade //Aplicando desconto do produto
        total += totalidade - desconto
        return total
    }

    let amountProducts = dadosDaVenda.Produtos.reduce(
        reduce,
        0
    );
    
    if(dadosDaVenda.Discount != null)
        amountProducts -= ((dadosDaVenda.Discount / 100) * amountProducts) //Aplicando desconto sob total

    if(amount != amountProducts ) console.log(`${amount} - ${amountProducts}`)

    return amount == amountProducts
}


module.exports = {verify}