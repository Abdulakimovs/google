const weapons = document.querySelectorAll('.weapon img');
const startButton = document.getElementById('start-game');
const selectedWeaponDisplay = document.getElementById('selected-weapon');

let selectedWeapon = null;

// Qurolni tanlash
weapons.forEach((weapon) => {
    weapon.addEventListener('click', () => {
        weapons.forEach((w) => w.classList.remove('selected'));
        weapon.classList.add('selected');
        selectedWeapon = weapon.alt; // Qurol nomini saqlash
    });
});

// O'yinni boshlash
startButton.addEventListener('click', () => {
    if (selectedWeapon) {
        selectedWeaponDisplay.textContent = `You selected: ${selectedWeapon}`;
    } else {
        selectedWeaponDisplay.textContent = `Please select a weapon!`;
    }
});
