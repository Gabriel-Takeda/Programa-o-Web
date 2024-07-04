(function () {
    let FPS = 10;
    const SIZE = 40;
    let intervalId = '';
    let contadorDeFrames = 0;
    let score = 0;
    let isFailure = false;
  
    let board;
    let snake;
    let food;
    let scoreElement; // Elemento de pontuação global para acesso fácil
  
    function init() {
      board = new Board(SIZE);
      snake = new Snake([[4, 4], [4, 5], [4, 6]]);
      food = new Food();
      scoreElement = document.getElementById("score"); // Captura o elemento de pontuação existente
      scoreElement.innerText = `Score: ${score.toString().padStart(5, '0')}`; // Atualiza o valor inicial do score na tela
    }
  
    function startGame() {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(run, 1000 / FPS);
    }
  
    function pauseGame() {
      clearInterval(intervalId);
    }
  
    function updateScore(points) {
      score += points;
      scoreElement.innerText = `Score: ${score.toString().padStart(5, '0')}`;
    }
  
    function checkCollision() {
      if (snake.checkSelfCollision() || snake.checkWallCollision()) {
        clearInterval(intervalId);
        alert("Game Over!");
        isFailure = true;
    
        // Limpar a tela ao detectar colisão com a parede
        const size = board.getSize();
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            document.querySelector(`#board tr:nth-child(${i + 1}) td:nth-child(${j + 1})`).style.backgroundColor = board.color;
          }
        }
      }
    }
  
    function checkIfFoodEaten() {
      const head = snake.body[snake.body.length - 1];
      if (head[0] === food.position[0] && head[1] === food.position[1]) {
        return true;
      }
      return false;
    }
  
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          snake.changeDirection(0);
          break;
        case "ArrowRight":
          snake.changeDirection(1);
          break;
        case "ArrowDown":
          snake.changeDirection(2);
          break;
        case "ArrowLeft":
          snake.changeDirection(3);
          break;
        case "s":
        case "S":
          if (!isFailure) {
            startGame();
          } else {
            // Reiniciar jogo após falha
            snake = new Snake([[4, 4], [4, 5], [4, 6]]);
            food = new Food(); // Criar uma nova instância de Food
            score = 0;
            scoreElement.innerText = `Score: ${score.toString().padStart(5, '0')}`;
            FPS = 10;
            contadorDeFrames = 0;
            isFailure = false;
            startGame();
          }
          break;
        case "p":
        case "P":
          pauseGame();
          break;
        default:
          break;
      }
    });
  
    class Board {
      constructor(size) {
        this.size = size;
        this.element = document.createElement("table");
        this.element.setAttribute("id", "board");
        this.color = "#ccc";
        document.body.appendChild(this.element);
        for (let i = 0; i < size; i++) {
          const row = document.createElement("tr");
          this.element.appendChild(row);
          for (let j = 0; j < size; j++) {
            const field = document.createElement("td");
            row.appendChild(field);
          }
        }
        scoreElement = document.createElement("div");
        scoreElement.setAttribute("id", "score");
        scoreElement.style.position = "absolute";
        scoreElement.style.top = "10px";
        scoreElement.style.left = "10px";
        scoreElement.style.fontSize = "20px";
        scoreElement.innerText = `Score: ${score.toString().padStart(5, '0')}`;
        document.body.appendChild(scoreElement);
      }
  
      getSize() {
        return this.size;
      }
    }
  
    class Food {
      constructor() {
        this.position = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
        this.color = this.sortColor();
        this.render();
      }
  
      sortColor() {
        const rand = Math.random();
        return rand < 0.67 ? 'black' : 'red';
      }
  
      render() {
        document.querySelector(`#board tr:nth-child(${this.position[0] + 1}) td:nth-child(${this.position[1] + 1})`).style.backgroundColor = this.color;
      }
  
      spawn() {
        this.position = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
        this.color = this.sortColor();
        this.render();
      }
    }
  
    class Snake {
      constructor(body) {
        this.body = body;
        this.color = "#222";
        this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
        this.render();
      }
  
      render() {
        this.body.forEach(field => {
          document.querySelector(`#board tr:nth-child(${field[0] + 1}) td:nth-child(${field[1] + 1})`).style.backgroundColor = this.color;
        });
      }
  
      walk() {
        const head = this.body[this.body.length - 1];
        checkCollision();
        let newHead;
        switch (this.direction) {
          case 0:
            newHead = [head[0] - 1, head[1]];
            break;
          case 1:
            newHead = [head[0], head[1] + 1];
            break;
          case 2:
            newHead = [head[0] + 1, head[1]];
            break;
          case 3:
            newHead = [head[0], head[1] - 1];
            break;
          default:
            break;
        }
  
        this.body.push(newHead);
        const oldTail = this.body.shift();
        document.querySelector(`#board tr:nth-child(${newHead[0] + 1}) td:nth-child(${newHead[1] + 1})`).style.backgroundColor = this.color;
        document.querySelector(`#board tr:nth-child(${oldTail[0] + 1}) td:nth-child(${oldTail[1] + 1})`).style.backgroundColor = board.color;
  
        if (contadorDeFrames % 60 === 0) {
          FPS += 1;
          startGame(); // Reiniciar o jogo com novo FPS
        }
        contadorDeFrames += 2;
  
        if (checkIfFoodEaten()) {
          this.grow();
          updateScore(food.color === 'red' ? 2 : 1);
          food.spawn();
        }
      }
  
      changeDirection(direction) {
        this.direction = direction;
      }
  
      grow() {
        const tail = this.body[0];
        this.body.unshift([tail[0], tail[1]]);
      }
  
      checkSelfCollision() {
        const head = this.body[this.body.length - 1];
        for (let i = 0; i < this.body.length - 1; i++) {
          if (head[0] === this.body[i][0] && head[1] === this.body[i][1]) {
            return true;
          }
        }
        return false;
      }
  
      checkWallCollision() {
        const head = this.body[this.body.length - 1];
        if (head[0] < 0 || head[0] >= SIZE || head[1] < 0 || head[1] >= SIZE) {
          return true;
        }
        return false;
      }
    }
  
    function run() {
      snake.walk();
    }
  
    init();
  })();