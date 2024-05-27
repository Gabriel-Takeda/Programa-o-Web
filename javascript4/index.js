function handleBotao() {

    const botao = document.getElementById('botao')
    const input = document.getElementById("input")
    const area = document.getElementById('area')
    const circuferencia = document.getElementById('circuferencia')

    botao.onclick = () => {
        const resultado = calcularValores(parseFloat(input.innerHTML))
        area.innerHTML = resultado[0]
        circuferencia.innerHTML = resultado[1]
    }
}

const calcularValores = (raio) => {
    return [ 3.14 * raio * raio, 2 * 3.14 * raio]
}