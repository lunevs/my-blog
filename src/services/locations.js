import baseService from './baseService'
const locationsUrl = 'http://localhost/api/locations'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => baseService.getAll(locationsUrl, token)

const getOne = (id) => baseService.getOne(locationsUrl, id, token)

const create = async (newObject) => baseService.create(locationsUrl, newObject, token)

const update = (id, newObject) => baseService.update(locationsUrl, id, newObject, token)

const remove = (id) => baseService.remove(locationsUrl, id, token)

export default { getAll, getOne, create, update, remove, setToken }

