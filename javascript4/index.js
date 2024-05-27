console.log('amor doce');
const botao = document.getElementById('botao');
const input = document.getElementById("input");
const area = document.getElementById('area');
const circunferencia = document.getElementById('circu');

botao.onclick = (event) => {
    event.preventDefault();
    console.log('amor doce 2');
    const resultado = calcularValores(parseFloat(input.value));
    area.placeholder = resultado[0];
    circunferencia.placeholder = resultado[1];
}

const calcularValores = (raio) => {
    return [ 3.14 * raio * raio, 2 * 3.14 * raio];
}