export function renderProfile(profile) {
// use an if/else statement to check if this is the user that's logged in; use that to determine how to render the profile
// if it is the logged in user, try changing divs to inputs
    const profileEl = document.createElement('div');
    const talentsDiv = document.createElement('div');
    const nameEl = document.createElement('p');
    const aboutEl = document.createElement('p');
    const locationEl = document.createElement('p');
    const interestsEl = document.createElement('p');

    profileEl.classList.add('profile');
    talentsDiv.classList.add('talents');

    nameEl.textContent = profile.name;
    aboutEl.textContent = profile.about;
    locationEl.textContent = profile.location;
    interestsEl.textContent = profile.interests;

    for (let talent of profile.talents) {
        const haveEl = document.createElement('p');
        const wantEl = document.createElement('p');

        haveEl.textContent = talent.talents.have_id;
        wantEl.textContent = talent.talents.want_id;

        talentsDiv.append(haveEl, wantEl);
    }
    profileEl.append(nameEl, locationEl, talentsDiv, interestsEl, aboutEl);
    // profilesEl.append(profileEl);

    return profileEl;
}