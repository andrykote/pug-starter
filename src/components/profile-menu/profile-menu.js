let profileIcon = document.querySelector('.profile-picture');
let profileMenu = document.querySelector('.profile-menu');

window.addEventListener('click', function() {
    let eventProfileMenu= event.target.closest('.profile-menu') ;

    if (!(profileIcon.contains(event.target) || eventProfileMenu)) {
        profileMenu.style.display='none';
    }
});

profileIcon.addEventListener('click', function() {
    profileMenu.style.display='block';
  });