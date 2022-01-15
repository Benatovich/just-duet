export function renderProfile(profile) {
    const profileEl = document.createElement('div');
    const talentsDiv = document.createElement('div');
    const nameEl = document.createElement('p');

    profileEl.classList.add('profile');
    talentsDiv.classList.add('talents');

    nameEl.textContent = profile.name;

    for (let talent of profiles.talents) {
        const haveEl = document.createElement('p');
        const wantEl = document.createElement('p');

        haveEl.textContent = talent.talents.have_id;
        wantEl.textContent = talent.talents.want_id;

        talentsDiv.append(haveEl, wantEl);
    }
    profileEl.append(nameEl, talentsDiv);
    // profilesEl.append(profileEl);

    return profileEl;
}