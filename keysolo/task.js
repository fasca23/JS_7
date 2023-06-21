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

    
    document.addEventListener(`keydown`, button => {
        const symbol = this.currentSymbol;
        // исключаем все нажатия кроме букв и цифр
        if ([32, 65, 67, 69, 83, 84, 91, 92].includes(button.key.charCodeAt())) {
          return
        }
        // ??
        if (button.repeat) {
          return
        }
        if (button.key.toLowerCase() === symbol.textContent.toLowerCase()) {
          return this.success();
        }
        return this.fail();
      })
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
        'боб',
        'супер',
        'нетология',
        'привет',
        'котенок',
        'рок',
        'ютуб',
        'попкорн',
        'кино',
        'питон',
        'джава',
        'информатика'
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