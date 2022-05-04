import axios from 'axios'

const register = (user, baseUrl) => {
    const request = axios.post(baseUrl, user)
    return request.then(response => response.data)
}

const getAll = (baseUrl, token) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const getOne = (baseUrl, id, token) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.get(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}

const create = async (baseUrl, newObject, token) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}


const update = (baseUrl, id, newObject, token) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.put(`${baseUrl}/${id}`, newObject, config)
    return request.then(response => response.data)
}

const remove = (baseUrl, id, token) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}

export default { register, getAll, getOne, remove, update, create }


