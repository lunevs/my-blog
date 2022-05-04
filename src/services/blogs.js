import baseService from './baseService'
const blogUrl = 'http://localhost/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => baseService.getAll(blogUrl, token)

const create = async (newObject) => baseService.create(blogUrl, newObject, token)

const update = (id, newObject) => baseService.update(blogUrl, id, newObject, token)

const remove = (id) => baseService.remove(blogUrl, id, token)

export default { getAll, create, update, remove, setToken }

