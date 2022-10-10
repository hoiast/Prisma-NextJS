import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers';

export const eventService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getPeople
};

const baseUrl = `${apiUrl}/events`;

function getAll() {
    return fetchWrapper.get(baseUrl);
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

function getPeople (id:number) {
    return fetchWrapper.get(`${baseUrl}/${id}/people`)
}
