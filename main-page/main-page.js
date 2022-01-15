import { checkAuth, logout, fetchProfiles } from '../fetch-utils.js';
// import { renderProfile } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const profilesEl = document.querySelector('.profiles-container');
console.log(profilesEl);
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
        const profileEl = document.createElement('div');
        const talentsDiv = document.createElement('div');
        const nameEl = document.createElement('p');

        profileEl.classList.add('profile');
        talentsDiv.classList.add('talents');

        nameEl.textContent = profile.name;

        for (let talent of profiles.talents) {
            const haveEl = document.createElement('p');
            const wantEl = document.createElement('p');

            haveEl.textContent = talent.talents.have_id;
            wantEl.textContent = talent.talents.want_id;

            talentsDiv.append(haveEl, wantEl);
        }
        profileEl.append(nameEl, talentsDiv);
        profilesEl.append(profileEl);
    }
}