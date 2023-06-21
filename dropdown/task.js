
const butDrop = document.querySelectorAll(`.dropdown__value`);

// console.log(buttonsDropdown)

// проверяем нажатие на заголовок меню
(function() {
  butDrop.forEach(but => {
    // при нажатии отправляем в функцию открытия
    but.addEventListener(`click`, openDrop);
  })
}())

function openDrop() {

  const dropdownList = this.closest(`.dropdown`).querySelector(`.dropdown__list`);
  // console.log(dropdownList)
  const buttonsLinks = dropdownList.querySelectorAll(`.dropdown__link`);
  // console.log(buttonsLinks)
  dropdownList.classList.toggle(`dropdown__list_active`);

  buttonsLinks.forEach((but) => {
    but.onclick = choiceSetting;
  })
}
// реализуем нажатие на список меню
function choiceSetting() {
  this.closest(`.dropdown__list`).classList.remove(`dropdown__list_active`);
  this.closest(`.dropdown`).querySelector(`.dropdown__value`).textContent = this.textContent;
  return false;
}