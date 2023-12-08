import axios from 'axios'

const getTest = async () => {
    try {
        console.log('#login')
        const response = await axios.get('http://localhost:3000/api')
        console.log('#response', response)
        return response
    } catch (error) {
        console.log('#error', error)
        throw error
    }
}

const loginPost = async (params) => {
    try {
        console.log('#loginPost', params)
        const response = await axios.post('http://localhost:3000/api/login', params)
        console.log('#response', response)
        return response

    } catch (error) {
        console.log('#loginPost', error)
        throw error
    }
}

export {
    getTest,
    loginPost
}