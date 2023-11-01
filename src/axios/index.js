import axios from "axios";

const todoUrl = 'http://localhost:3000'

const todoAxios = axios.create({
    baseURL:todoUrl,
    timeout:1000
})
todoAxios.interceptors.response.use(res=>{
    console.log(res)
    if (res.status > 400 || res.status < 200){
        console.log('服务异常')
        return Promise.reject(new Error(res.statusText))
    }else{
        if (res.config.method === 'get'){
            return res.data
        }
        return res.statusText
    }

},err=>{
    // console.log('接口报错',err)
    return Promise.reject(err)
})
export default todoAxios