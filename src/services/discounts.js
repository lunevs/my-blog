import baseService from './baseService'
const discountsUrl = 'http://localhost/api/discounts'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => baseService.getAll(discountsUrl, token)

const getOne = (id) => baseService.getOne(discountsUrl, id, token)

const create = async (newObject) => baseService.create(discountsUrl, newObject, token)

const update = (id, newObject) => baseService.update(discountsUrl, id, newObject, token)

const remove = (id) => baseService.remove(discountsUrl, id, token)

export default { getAll, getOne, create, update, remove, setToken }

