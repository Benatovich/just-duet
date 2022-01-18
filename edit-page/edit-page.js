import { 
    checkAuth, 
    updateProfile,
    fetchProfile, 
    logout } from '../fetch-utils.js';


checkAuth();

const form = document.querySelector('.form');
const nameEl = document.getElementById('name');
const interestsEl = document.getElementById('interests');
const locationEl = document.getElementById('location');
const aboutEl = document.getElementById('about');
const wantsEl = document.getElementById('want-talents');
const havesEl = document.getElementById('have-talents');
const logoutButton = document.querySelector('#logout');
console.log(wantsEl, havesEl);

window.addEventListener('load', async() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const profile = await fetchProfile(id);

    nameEl.value = profile.name;
    interestsEl.value = profile.interests;
    locationEl.value = profile.location;
    aboutEl.value = profile.about;
    wantsEl.value = profile.want_talents;
    havesEl.value = profile.have_talents;
});

form.addEventListener('submit', async(e) => {

    e.preventDefault();

    const data = new FormData(form);
    const name = data.get('name');
    const interests = data.get('interests');
    const location = data.get('location');
    const about = data.get('about');
    const wants = data.get('wants');
    const haves = data.get('haves');

    await updateProfile({ 
        name: name,
        interests: interests,
        about: about,
        location: location,
        want_talents: wants,
        have_talents: haves,
    });

    window.location.href = '../details-page';
});

logoutButton.addEventListener('click', () => {
    logout();
});

// if updateProfile can't take two objects, then split it into two functions using function below:
// await updateTalentsTable({
//     want_id: wants,
//     have_id: haves,
// });