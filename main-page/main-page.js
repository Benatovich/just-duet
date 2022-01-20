import { checkAuth, 
    logout, 
    fetchProfiles, 
    getUser, 
    getUserId } from '../fetch-utils.js';

import { renderProfile } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const profilesEl = document.querySelector('.profiles-container');
const myPageButton = document.getElementById('my-page');

// testing shit here
// const user = await getUser();
// const userId = user.user.id;

// const messageId = await getUserId(userId);
// console.log(messageId);

window.addEventListener('load', async() => {
    await displayProfiles();
});

logoutButton.addEventListener('click', () => {
    logout();
});


myPageButton.addEventListener('click', async() => {
    const user = await getUser();
    const userId = user.user.id;

    const profile = await getUserId(userId);

    window.location.href = `../details-page/?id=${profile.id}`;
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