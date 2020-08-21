/* eslint-disable no-throw-literal */
import request from 'superagent';

const URL = "http://localhost:3000" || "https://mysterious-retreat-72805.herokuapp.com";
const API = "https://api.open5e.com/spells/?search="

export function signUp(userData) {
    try {
        return request.post(`${URL}/auth/signup`, userData);
    } catch(e) {
        throw { error: e.message }
    }
}

export function signIn(userData) {
    try {
        return request.post(`${URL}/auth/signin`, userData);
    } catch(e) {
        throw { error: e.message }
    }
}

export function searchSpells(name) {
    try {
        return request.get(`${API}${name}`)
    } catch(e) {
        // eslint-disable-next-line no-undef
        return { error: e.message }
    }
}

export function createFavorite(spellData) {
    const token = localStorage.getItem('token');

    return request.post(`${URL}/api/favorites`)
        .send(spellData)
        .set('Authorization', token);
}

export function fetchFavorites() {
    const token = localStorage.getItem('token');

    try{
        return request
            .get(`${URL}/api/favorites`)
            .set('Authorization', token);
    } catch(e) {
        return { error: e.message }
    }
}

export function deleteFavorite(id) {
    const token = localStorage.getItem('token');

    return request.delete(`${URL}/api/favorites/${id}`)
        .set('Authorization', token);
}
