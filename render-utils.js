export function renderProfile(profile) {


    const profileEl = document.createElement('div');
    const talentsDiv = document.createElement('div');
    const nameEl = document.createElement('p');
    const haveEl = document.createElement('p');
    const wantEl = document.createElement('p');

    profileEl.classList.add('profile');
    talentsDiv.classList.add('talents');

    profileEl.href = `../details-page/?id=${profile.id}`;

    nameEl.textContent = profile.name;
    haveEl.textContent = profile.have_talents;
    wantEl.textContent = profile.want_talents;
    
    talentsDiv.append(haveEl, wantEl);
        
    profileEl.append(nameEl, talentsDiv);

    return profileEl;
}
export function renderProfileDetails(profile) {
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

    return profileEl;
}