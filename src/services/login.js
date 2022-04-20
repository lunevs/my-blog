import axios from 'axios'
const baseUrl = 'http://localhost/api/login'

const login = credentials => {
    const request = axios.post(baseUrl, credentials)
    console.log('credentials', credentials)
    return request.then(response => response.data)
}

export default { login }


