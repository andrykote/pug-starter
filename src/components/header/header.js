
let searchIcon = document.querySelector('.search-icon');
let searchMobileBlock = document.querySelector('.mobile');
let mobileSearchInput = document.querySelector('.search-mobile');
let mobileBtnClose = document.querySelector('.mobile_btn-close');




searchIcon.addEventListener('click', function() {
  searchMobileBlock.classList.toggle('mobile-nvisible')
  mobileSearchInput.focus();
});

mobileBtnClose.addEventListener('click', function() {
  mobileSearchInput.value = '';
});