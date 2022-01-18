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
    const id = params.get('id');

    const profile = await fetchProfile(id);

    const profileEl = document.createElement('div');
    const talentsDiv = document.createElement('div');
    const aboutDiv = document.createElement('div');
    const nameEl = document.createElement('p');
    const locationEl = document.createElement('p');
    const interestsEl = document.createElement('p');
    const aboutEl = document.createElement('p');
    const haveEl = document.createElement('p');
    const wantEl = document.createElement('p');

    profileEl.classList.add('profile');
    talentsDiv.classList.add('talents');
    aboutDiv.classList.add('about');

    nameEl.textContent = profile.name;
    locationEl.textContent = profile.location;
    interestsEl.textContent = profile.interests;
    aboutEl.textContent = profile.about;
    haveEl.textContent = profile.have_talents;
    wantEl.textContent = profile.want_talents;

    talentsDiv.append(haveEl, wantEl);

    aboutDiv.append(interestsEl, aboutEl);

    profileEl.append(nameEl, talentsDiv, aboutDiv);
    profileContainerEl.append(profileEl);


}