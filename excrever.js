const xl = require('excel4node')
const wb = new xl.Workbook()
const ws1 = wb.addWorksheet('Relatório 1')
const ws2 = wb.addWorksheet('Relatório 2')
const ws3 = wb.addWorksheet('Relatório 3')
/**
 * Escrever os produtos nas linhas da planilha
 * 
 * @param {*} dados - Array de produtos
 */
function escrever(dados) {
    escreverColunas()

    let linhaIndex1 = 2; 
    let linhaIndex2 = 2; 
    let linhaIndex3 = 2; 
    dados.forEach(venda => { 
        if(venda.Mes == 4) {
            ws1.cell(linhaIndex1,1).string(venda.Cliente)
            ws1.cell(linhaIndex1,2).number(venda.Total)
            ws1.cell(linhaIndex1,3).string(venda.Recorrencia)
            ++linhaIndex1
        }  else if(venda.Mes == 5) {
            ws2.cell(linhaIndex2,1).string(venda.Cliente)
            ws2.cell(linhaIndex2,2).number(venda.Total)
            ws2.cell(linhaIndex2,3).string(venda.Recorrencia)
            ++linhaIndex2
        }  else if(venda.Mes == 6) {
            ws3.cell(linhaIndex3,1).string(venda.Cliente)
            ws3.cell(linhaIndex3,2).number(venda.Total)
            ws3.cell(linhaIndex3,3).string(venda.Recorrencia)
            ++linhaIndex3
        } 
    });

    wb.write('Relatório.xlsx')
}

/**
 * Escrever na planilha o nome do cabeçalho das colunas
 */
const escreverColunas = () => {
    const colunas = [
        "Cliente",
        "Valor da venda",
        "Locação"
    ]

    let counter1 = 1; 
    let counter2 = 1; 
    let counter3 = 1; 
    colunas.forEach(cabecalho => { 
        ws1.cell(1, counter1++).string(cabecalho);
        ws2.cell(1, counter2++).string(cabecalho);
        ws3.cell(1, counter3++).string(cabecalho);
    });
}

module.exports = { escrever }
