// нашли и сохранили в переменную все элементы меню
let tabNavigationList  = [...document.querySelectorAll('.tab')];
// нашли само меню
let tabNavigationElement = document.querySelector(".tab__navigation");
// нашли контент для меню
let tabContentList = [...document.querySelectorAll('.tab__content')];

// добавляем действие после события "клик"
tabNavigationElement.addEventListener('click', event => {
// проверил как при наведении работает
// tabNavigationElement.addEventListener('mouseover', event => {
        // определяемся был ли клик на tab
        let tabMenu = event.target.closest(".tab");

        if(tabMenu) {
            // определяем индекс вкладки
            let tabIndex = tabNavigationList.indexOf(event.target);
            // если нажатие произошло НЕ на активной вкладке
            if(!(tabNavigationList[tabIndex].querySelector(".tab_active"))){
                // ищем и снимаем активационные классы
                // для меню
                tabNavigationList.forEach(elTab => elTab.classList.remove("tab_active"));
                // для контента
                tabContentList.forEach(tabContent => tabContent.classList.remove("tab__content_active"));
                
                // ставим оба класса найденному индексу
                // для активации кнопки меню
                tabNavigationList[tabIndex].classList.add("tab_active");
                // кля активации контента
                tabContentList[tabIndex].classList.add("tab__content_active");
            }
        }
    });