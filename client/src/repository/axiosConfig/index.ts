import axios, { AxiosInstance } from 'axios'
import * as AxiosLogger from 'axios-logger';

class AxiosWrapper{
    token = ""
    baseURL = ""
    instance!: AxiosInstance
    constructor(){
        if(process.env.NODE_ENV=="development"){
            this.baseURL = 'http://localhost:8080'
        }
        this.instance = axios.create({
            baseURL: this.baseURL
        });
        this.setInterceptors()
    }

    setInterceptors(){
        this.instance.interceptors.request.use((request) => {
            // write down your request intercept.
            request.headers.post["Authorization"] = `Bearer ${this.token}`
            return AxiosLogger.requestLogger(request);
        }, (err) => {
            // write down your error intercept.
            return AxiosLogger.errorLogger(err);
        });
        this.instance.interceptors.response.use((response) => {
            // write down your response intercept.
            return AxiosLogger.responseLogger(response);
        }, (err) => {
            // write down your error intercept.
            return AxiosLogger.errorLogger(err);
        });
    }
}
export const axiosWrapper = new AxiosWrapper()

export default axiosWrapper.instance