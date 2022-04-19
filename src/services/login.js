import axios from 'axios'
const baseUrl = 'http://localhost/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    console.log('credentials', credentials)
    return response.data
}

export default { login }


