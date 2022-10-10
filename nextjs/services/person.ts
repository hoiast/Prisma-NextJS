import { log } from 'console';
import { number } from 'prop-types';
import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers';

export const personService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getEvents,
    joinEvent,
    leaveEvent
};

const baseUrl = `${apiUrl}/people`;

function getAll() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getById(id:number) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params:{}) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id:number, params:{}) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id:number) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function getEvents (id:number) {
    return fetchWrapper.get(`${baseUrl}/${id}/events`)
}

function joinEvent (id:number, eventId:number) {
    return fetchWrapper.patch(`${baseUrl}/${id}/events/${eventId}`,{})
}

function leaveEvent (id:number, eventId:number) {
    console.log("LEAVE EVENT", `${baseUrl}/${id}/events/${eventId}`)
    return fetchWrapper.delete(`${baseUrl}/${id}/events/${eventId}`)
}
