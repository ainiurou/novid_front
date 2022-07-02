import axios from 'axios'

const server = axios.create({
    baseURL:'http://localhost:3001'
})

export const getApiList = () => server.get('/api/list').then(res => { return res.data })