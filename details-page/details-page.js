/* eslint-disable no-console */
import {   
    checkAuth, 
    logout,
    fetchProfile,
    getUser, 
    getUserId,
    fetchMessages,
    createMessage,
    getAuthor,
    fetchTimestamp
} from '../fetch-utils.js';

import { renderProfileDetails } from '../render-utils.js';


// import { renderProfile } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const editButton = document.getElementById('edit-profile-button');
const profileContainerEl = document.querySelector('.profile-container');
const messagesContainerEl = document.querySelector('.messages-container');
const form = document.querySelector('.message-form');
const myPageButton = document.getElementById('my-page');



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

myPageButton.addEventListener('click', async() => {
    const user = await getUser();
    const userId = user.user.id;

    const profile = await getUserId(userId);

    window.location.href = `../details-page/?id=${profile.id}`;
});


editButton.addEventListener('click', async() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const profile = await fetchProfile(id);

    window.location.href = `../edit-page/?id=${profile.id}`;
});

async function fetchAndDisplayProfile() {
    profileContainerEl.textContent = '';
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    const profile = await fetchProfile(id);
    const profileEl = renderProfileDetails(profile);
    
    profileContainerEl.append(profileEl);
   
}

async function fetchAndDisplayMessages() {
    messagesContainerEl.textContent = '';

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const messages = await fetchMessages(id);
    console.log('messages!!!!', messages);
    
    for (let message of messages) {

        const user = await getUser();
        const userId = user.user.id;
        
        const author = await getAuthor(userId);

        //const timestamp = await fetchTimestamp(messageTimestamp);

        console.log('message!!!!', message);

        const messageEl = document.createElement('div');
        const messageTextEl = document.createElement('p');
        const authorEl = document.createElement('p');

        //const timestampEl = document.createElement('p');

        

        messageEl.classList.add('message');
        messageTextEl.classList.add('message-text');
        authorEl.classList.add('author-name');

        //timestampEl.classList.add('message-timestamp');

        console.log(messageTextEl, authorEl, 'testing');
        messageTextEl.textContent = message.message;
        authorEl.textContent = `- ${author.name}`;

        //timestampEl.textcontent = `- ${timestamp.created_at}`;
        
        messageEl.append(messageTextEl, authorEl,);
        messagesContainerEl.append(messageEl);
    }
}

