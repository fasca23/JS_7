class Game {

  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector(".word");
    this.winsElement = container.querySelector(".status__wins");
    this.lossElement = container.querySelector(".status__loss");
    this.timer = document.querySelector(".timer");
    this.reset();

    this.registerEvents();
    this.timerWork();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    this.timer.textContent = (this.currentSymbols.length)*slowdown;
  }

  timerWork() {
    clearInterval(this.set);
    const workTimer = () => {
      // console.log(this.timer.textContent);
      this.timer.textContent -= 1;
      if (this.timer.textContent == 0) {
        alert("Вы не успели! Попробуйте снова!");
        this.fail();
      }
    };
    this.set = setInterval(workTimer, 1000);
  }
// //////////////////////////////
  registerEvents() {
  // При переключении раскладки как бы подвисает... не выдает не неправильные слова не правильные...
  // Но это лечится легко, если нажимать левой клавишей мыши на экран браузера сразу после переключения раскладки shift+alt
  // Почему??????
    let currentSymbolType = this.currentSymbol.textContent.toLowerCase().charCodeAt(0);
      let collation = (e) => {
          currentSymbolType = this.currentSymbol.textContent.charCodeAt(0);
          if (currentSymbolType == e.key.toLowerCase().charCodeAt(0)) {
            this.success();
          } else {
            this.fail();
          }
      }
      document.addEventListener(`keypress`, collation);
  }
// //////////////////////////////
  success() {
    this.currentSymbol.classList.add("symbol_correct");
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert("Победа!");
      this.reset();
    }

    this.setNewWord();
    this.timer.textContent = (this.currentSymbols.length)*slowdown;
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert("Вы проиграли!");
      this.reset();
    }

    this.setNewWord();
    this.timer.textContent = (this.currentSymbols.length)*slowdown;
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        'боб gg',
        'супер gg',
        'нетологи яgg',
        'привет gg',
        'котенок gg',
        'рок gg',
        'ютуб gg',
        'попкорн gg',
        'кино gg',
        'питон gg',
        'джава gg',
        'информатика gg'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? "symbol_current" : ""}">${s}</span>`
      )
      .join("");
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector(".symbol_current");
    this.currentSymbols = Array.from(document.querySelectorAll(".symbol"));
  }
}

new Game(document.getElementById("game"), slowdown=3);