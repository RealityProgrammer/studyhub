import axiosInstance from "../route/interceptor.js";
const api = '/api/point'
async function createPoint(req) {
    const response = await axiosInstance.post(`${api}/add`,req);
    return response.data;
}
async function getAllPoints(id,page,size) {
    const response = await axiosInstance.get(`${api}/list/${id}`,{
        params:{page,size}
    });
    return response.data;
}
async function getPoints(req) {
    const response = await axiosInstance.get(`${api}/findByUser`,{
        params:req
    });
    return response.data;
}
export default {createPoint,getPoints,getAllPoints};