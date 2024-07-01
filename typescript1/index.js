console.log('amor doce');
var botao = document.getElementById('botao');
var input = document.getElementById('input');
var area = document.getElementById('area');
var circunferencia = document.getElementById('circu');
botao.onclick = function (event) {
    event.preventDefault();
    console.log('amor doce 2');
    var resultado = calcularValores(parseFloat(input.value));
    area.placeholder = resultado[0].toString();
    circunferencia.placeholder = resultado[1].toString();
};
var calcularValores = function (raio) {
    return [3.14 * raio * raio, 2 * 3.14 * raio];
};
