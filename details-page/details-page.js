/* eslint-disable no-console */
import {   
    checkAuth, 
    logout,
    fetchProfile,
    getUser, 
    getUserId,
    fetchMessages,
    createMessage
} from '../fetch-utils.js';

import { renderProfileDetails } from '../render-utils.js';


// import { renderProfile } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const editButton = document.getElementById('edit-profile-button');
const profileContainerEl = document.querySelector('.profile-container');
const messagesContainerEl = document.querySelector('.messages-container');
const form = document.querySelector('.message-form');


form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const data = new FormData(form);

    await createMessage(data.get('message-text'), id);


    await fetchAndDisplayMessages();
    await fetchAndDisplayProfile();
    
    form.reset();
});

window.addEventListener('load', async() => {
    await fetchAndDisplayMessages();

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
    profileContainerEl.textContent = '';
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    const profile = await fetchProfile(id);
    const profileEl = renderProfileDetails(profile);
    
    profileContainerEl.append(profileEl);
   
}

async function fetchAndDisplayMessages() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const messages = await fetchMessages(id);
    console.log('messages!!!!', messages);
    
    for (let message of messages) {
        

        console.log('message!!!!', message);
        const messageEl = document.createElement('div');
        const messageTextEl = document.createElement('p');
        const authorEl = document.createElement('p');
        

        messageEl.classList.add('message');
        messageTextEl.classList.add('message-text');
        authorEl.classList.add('author-name');

        console.log(messageTextEl, authorEl, 'testing');
        messageTextEl.textContent = message.message;
        // authorEl.textContent = message.profiles.name;
        
        messageEl.append(authorEl, messageTextEl);
        messagesContainerEl.append(messageEl);
    }
}

