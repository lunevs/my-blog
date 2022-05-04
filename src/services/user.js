import baseService from './baseService'
const userUrl = 'http://localhost/api/users'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const register = user => baseService.register(user, userUrl)

const getAll = () => baseService.getAll(userUrl, token)

const getOne = (id) => baseService.getOne(userUrl, id, token)

const update = (id, newObject) => baseService.update(userUrl, id, newObject, token)

const remove = (id) => baseService.remove(userUrl, id, token)

export default { getAll, register, update, remove, setToken, getOne }

