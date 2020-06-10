let searchButton = document.querySelector('.main-search-button');
let cardCollection =  document.querySelectorAll('.card');
let searchInput = document.querySelector('.main-search-input');
let searchForm = document.querySelector('.search-form')

let cardValues = Array.from(cardCollection);

searchForm.addEventListener('submit', function(event) {
    let searchValue = searchInput.value;
    event.preventDefault()

    cardValues.forEach(function (x) {
        x.classList.remove('card-invisible')
        if (!x.dataset.value.toLowerCase().includes(searchValue.trim())) {
            x.classList.add('card-invisible');

        }
    });
});
