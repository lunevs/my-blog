import baseService from './baseService'
const roomsUrl = 'http://localhost/api/rooms'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => baseService.getAll(roomsUrl, token)

const getOne = (id) => baseService.getOne(roomsUrl, id, token)

const create = async (newObject) => baseService.create(roomsUrl, newObject, token)

const update = (id, newObject) => baseService.update(roomsUrl, id, newObject, token)

const remove = (id) => baseService.remove(roomsUrl, id, token)

export default { getAll, getOne, create, update, remove, setToken }

