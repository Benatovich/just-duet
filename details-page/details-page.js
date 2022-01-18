import {   
    checkAuth, 
    logout,
    fetchProfile } from '../fetch-utils.js';


// import { renderProfile } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const profileContainerEl = document.querySelector('.profile-container');


// console.log(profileEl);

window.addEventListener('load', async() => {
    await displayProfile();
    // await displayMessages();
});

logoutButton.addEventListener('click', () => {
    logout();
});


async function displayProfile() {
    profileContainerEl.textContent = '';

    const params = new URLSearchParams(window.location.search);

    const profile = await fetchProfile(params.get('id'));

    const profileEl = document.createElement('div');
    const talentsDiv = document.createElement('div');
    const aboutDiv = document.createElement('div');
    const nameEl = document.createElement('p');
    const locationEl = document.createElement('p');
    const interestsEl = document.createElement('p');
    const aboutEl = document.createElement('p');

    profileEl.classList.add('profile');
    talentsDiv.classList.add('talents');
    aboutDiv.classList.add('about');

    nameEl.textContent = profile.name;
    locationEl.textContent = profile.location;
    interestsEl.textContent = profile.interests;
    aboutEl.textContent = profile.about;


    for (let talent of profile.talents) {
        const haveEl = document.createElement('p');
        const wantEl = document.createElement('p');

        haveEl.textContent = talent.talents.have_id;
        wantEl.textContent = talent.talents.want_id;

        talentsDiv.append(haveEl, wantEl);
    }

    aboutDiv.append(interestsEl, aboutEl);

    profileEl.append(nameEl, talentsDiv, aboutDiv);
    profileContainerEl.append(profileEl);



}