/* eslint-disable no-console */
const SUPABASE_URL = 'https://bldkvwcsogzeeohrgemf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MjExOTQxMiwiZXhwIjoxOTU3Njk1NDEyfQ.ZB2Np0Wtsn23P3JjRuzH5v11_nI4pm9CfkE63toNYLc';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function createProfile(email, name, want, have) {
    const response = await client   
        .from('profiles')
        .insert([{
            email,
            name,
            want_talents: want,
            have_talents: have,
        }]);

    return checkError(response);
}

export async function updateProfile(profile) {
    const response = await client
        .from('profiles')
        .select()
        .insert({ profile });

    return checkError(response);
}

export async function fetchProfile(id) {
    const response = await client
        .from('profiles')
        .select('*, messages (*)')
        .match({ id })
        .single();

    return checkError(response);
}



export async function fetchProfiles() {
    const response = await client
        .from('profiles')
        .select();
    
    return checkError(response);
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./main-page');
    }
}

export async function signupUser(email, password, name, want, have){
    const response = await client.auth.signUp({ email, password });
    
    await createProfile(email, name, want, have);
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
