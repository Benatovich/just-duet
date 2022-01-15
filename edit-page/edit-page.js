import { checkAuth, createProfile } from '../fetch-utils';


checkAuth();

const container = document.querySelector('.container');
const form = document.querySelector('.form');

const logoutButton = document.querySelector('#logout');

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
    }, {
        want_id: wants,
        have_id: haves,
    });
});

// if updateProfile can't take two objects, then split it into two functions using function below:
// await updateTalentsTable({
//     want_id: wants,
//     have_id: haves,
// });