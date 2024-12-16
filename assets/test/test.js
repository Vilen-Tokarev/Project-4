document.getElementById('burgerIcon').addEventListener('click', function() { 
    const menuItems = document.getElementById('menuItems'); 
    const burgerIcon = document.getElementById('burgerIcon'); 
 
    if (menuItems.classList.contains('open')) { 
        menuItems.classList.remove('open'); 
        burgerIcon.classList.remove('open'); 
    } else { 
        menuItems.classList.add('open'); 
        burgerIcon.classList.add('open'); 
    } 
});