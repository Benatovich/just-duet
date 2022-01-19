import {   
    checkAuth, 
    logout,
    fetchProfile, 
    
    getUser, 
    getUserId,
    fetchMessages,
    createMessage
} from '../fetch-utils.js';
import { renderProfile, renderProfileDetails } from '../render-utils.js';


// import { renderProfile } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const editButton = document.getElementById('edit-profile-button');
const profileContainerEl = document.querySelector('.profile-container');
const messagesContainerEl = document.querySelector('.messages-container');
const fullProfileEl = document.querySelector('.full-profile');

const form = document.querySelector('.message-form');


// console.log(profileEl);

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);

    await createMessage({
        message: data.get('message-text')
    });

    await fetchAndDisplayProfile();

    form.reset();
});

window.addEventListener('load', async() => {
    await fetchAndDisplayProfile();

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const user = await getUser();
    const userId = user.user.id;
    console.log(userId);
    
    const profile = await getUserId(userId);
    console.log(profile);
    if (+id === profile.id) {
        console.log(profile.id, id, 'match'); 
        editButton.classList.add('visible');
    }
    else {
        console.log(profile.id, id, 'no match');
        editButton.classList.add('hide');
    }
    // await displayMessages();
});

logoutButton.addEventListener('click', () => {
    logout();
});

editButton.addEventListener('click', async() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const profile = await fetchProfile(id);

    

    window.location.href = `../edit-page/?id=${profile.id}`;
});

// combine fetch/display profile with display messages
// handle left and right side of the page with one function
async function fetchAndDisplayProfile() {
    fullProfileEl.textContent = '';
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    const profile = await fetchProfile(id);
    const profileEl = renderProfileDetails(profile);


    profileContainerEl.append(profileEl);

    
}

