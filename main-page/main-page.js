import { checkAuth, logout, fetchProfiles } from '../fetch-utils.js';
import { renderProfile } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const profilesEl = document.querySelector('.profiles-container');


window.addEventListener('load', async() => {
    await displayProfiles();
});

logoutButton.addEventListener('click', () => {
    logout();
});


async function displayProfiles() {
    const profiles = await fetchProfiles();

    profilesEl.textContent = '';

    const profileEl = renderProfile(profiles);

    profileEl.addEventListener('click', () => {
        window.location.href = '../details-page';
    });
    
    profilesEl.append(profileEl);

    
}