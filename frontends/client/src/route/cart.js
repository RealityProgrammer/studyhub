import axiosInstance from "../route/interceptor.js";

const api = '/api/cart'

async function getAllCart() {
    const response = await axiosInstance.get(`${api}/list`);
    return response.data;
}

async function deleteCart(ids) {
    const response = await axiosInstance.delete(`${api}/delete`, {data: ids});
    return response.data;
}

async function updateCart(courseId, req) {
    const response = await axiosInstance.put(`${api}/update/${courseId}`, req);
    return response.data;
}

async function addCart(req) {
    const response = await axiosInstance.post(`${api}/add`,req);
    return response.data;
}

export default {getAllCart, deleteCart, updateCart,addCart};