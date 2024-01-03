import axios from 'axios'




const getDashboard = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:3000/api/dashboard");
        return response
    } catch (error) {
        throw error
    }

}

export { getDashboard }