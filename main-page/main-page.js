import { checkAuth, 
    logout, 
    fetchProfiles, 
    getUser, 
    getUserId,
    searchFunction } from '../fetch-utils.js';

import { renderProfile } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const profilesEl = document.querySelector('.profiles-container');
const myPageButton = document.getElementById('my-page');
const searchForm = document.querySelector('.search-form');
// testing shit here
// const user = await getUser();
// const userId = user.user.id;

// const messageId = await getUserId(userId);
// console.log(messageId);

searchForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(searchForm);
    const search = data.get('search');
    

    await searchFunction(search);
    await displayProfiles();
});

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