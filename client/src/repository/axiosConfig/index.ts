import axios from 'axios'

let baseURL = ""
if(process.env.NODE_ENV=="development"){
    baseURL = 'http://localhost:8080'
}

const instance = axios.create({
    baseURL
});

export default instance