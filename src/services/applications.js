import baseService from './baseService'
const applicationsUrl = 'http://localhost/api/applications'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => baseService.getAll(applicationsUrl, token)

const getOne = (id) => baseService.getOne(applicationsUrl, id, token)

const create = async (newObject) => baseService.create(applicationsUrl, newObject, token)

const update = (id, newObject) => baseService.update(applicationsUrl, id, newObject, token)

const remove = (id) => baseService.remove(applicationsUrl, id, token)

export default { getAll, getOne, create, update, remove, setToken }

