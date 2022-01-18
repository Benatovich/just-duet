export function renderProfile(profile) {

    const profileEl = document.createElement('div');
    const talentsDiv = document.createElement('div');
    const nameEl = document.createElement('p');
    const haveEl = document.createElement('p');
    const wantEl = document.createElement('p');

    profileEl.classList.add('profile');
    talentsDiv.classList.add('talents');

    nameEl.textContent = profile.name;
    haveEl.textContent = profile.have_talents;
    wantEl.textContent = profile.want_talents;

    
    talentsDiv.append(haveEl, wantEl);
        
    profileEl.append(nameEl, talentsDiv);

    return profileEl;
}