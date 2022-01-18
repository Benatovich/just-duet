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

    for (let profile of profiles) {
        const profileEl = renderProfile(profile);

        profileEl.addEventListener('click', () => {
            window.location.href = `../details-page/?id=${profile.id}`;
        });

        profilesEl.append(profileEl);

    }

}