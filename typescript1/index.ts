console.log('amor doce');

const botao = document.getElementById('botao') as HTMLButtonElement;
const input = document.getElementById('input') as HTMLInputElement;
const area = document.getElementById('area') as HTMLInputElement;
const circunferencia = document.getElementById('circu') as HTMLInputElement;

botao.onclick = (event: MouseEvent) => {
    event.preventDefault();
    console.log('amor doce 2');
    const resultado = calcularValores(parseFloat(input.value));
    area.placeholder = resultado[0].toString();
    circunferencia.placeholder = resultado[1].toString();
}

const calcularValores = (raio: number): [number, number] => {
    return [3.14 * raio * raio, 2 * 3.14 * raio];
}
