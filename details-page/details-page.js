import { checkAuth, logout, fetchProfiles } from '../fetch-utils.js';
// import { renderProfile } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const profileEl = document.querySelector('.profile-container');
console.log(profileEl);
window.addEventListener('load', async() => {
    await displayProfile();
    await displayMessages();
});

logoutButton.addEventListener('click', () => {
    logout();
});


async function displayProfile() {
    const profile = await fetchProfile();
    profileEl.textContent = '';
}