import baseService from './baseService'
const eventUrl = 'http://localhost/api/events'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => baseService.getAll(eventUrl, token)

const getOne = (id) => baseService.getOne(eventUrl, id, token)

const create = async (newObject) => baseService.create(eventUrl, newObject, token)

const update = (id, newObject) => baseService.update(eventUrl, id, newObject, token)

const remove = (id) => baseService.remove(eventUrl, id, token)

export default { getAll, getOne, create, update, remove, setToken }

