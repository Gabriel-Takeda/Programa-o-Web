function jogarPedraPapelTesoura() {
    let vitorias = 0;
    let opcoes = ["pedra", "papel", "tesoura"];

    while (true) {
        // Jogador faz a escolha
        let escolhaJogador = prompt("Escolha: pedra, papel ou tesoura?");
        if (!opcoes.includes(escolhaJogador)) {
            alert("Escolha inválida! Tente novamente.");
            continue;
        }

        // Computador faz a escolha
        let escolhaComputador = opcoes[Math.floor(Math.random() * 3)];
        alert(`Computador escolheu: ${escolhaComputador}`);

        // Determinar o vencedor
        if (escolhaJogador === escolhaComputador) {
            alert("Empate!");
        } else if (
            (escolhaJogador === "pedra" && escolhaComputador === "tesoura") ||
            (escolhaJogador === "papel" && escolhaComputador === "pedra") ||
            (escolhaJogador === "tesoura" && escolhaComputador === "papel")
        ) {
            alert("Você ganhou!");
            vitorias++;
        } else {
            alert("Você perdeu!");
            break;
        }
    }

    alert(`Jogo terminado! Você ganhou ${vitorias} vez(es).`);
}

jogarPedraPapelTesoura();