/* eslint-disable no-throw-literal */
import request from 'superagent';

const URL = "http://localhost:3000";
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
    } catch {
        // eslint-disable-next-line no-undef
        return { error: e.message }
    }
}
