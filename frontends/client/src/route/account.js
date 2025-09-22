import axiosInstance from "../route/interceptor.js";

async function changePassword(id, req) {
    const response = await axiosInstance.put(`/api/account/updatePassWord/${id}`, req);
    return response.data;
}
async function updateAccount(id, formData) {
    const response = await axiosInstance.put(`/api/account/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}
async function getAccount (req) {
    const response = await axiosInstance.get(`/api/account/findById/${req}`);
    return response.data;
}
export default { changePassword,updateAccount, getAccount};
