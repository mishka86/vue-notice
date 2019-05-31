import axios from 'axios'

const api = axios.create({
    baseURL: '//localhost:8000/api'
})

api.interceptors.response.use(function(response)
{
    return response;
}, function(error){
    //에러트래킹 함수호출
    
    return Promise.reject(error);
});


export default api; 