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

const loginPost = async () => {
    try {
        console.log('#loginPost')
        const response = await axios.post('http://localhost:3000/api/login', {
            email: 'test@test.com',
            password: '12345'
        })
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