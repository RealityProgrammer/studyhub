import axiosInstance from "../route/interceptor.js";
const api = '/api/exam'
const apiDetails = '/api/exam_details'

async function getUserExams(page, size) {
    const response = await axiosInstance.get(`${api}/getForUser`, {
        params: { page, size },
    });
    return response.data;
}
async function getExamByName(req) {
    const response = await axiosInstance.get(`/api/exam/findByAttribute`, {
        params:  req ,
    });
    return response.data;
}
async function getExamById(id) {
    const response = await axiosInstance.get(`${api}/findById/${id}`);
    return response.data;
}
async function getExamByCode(code) {
    const response = await axiosInstance.get(`${api}/findByCode/${code}`);
    return response.data;
}
async function getExamDetailsByExamId(page,size,id) {
    const response = await axiosInstance.get(`${apiDetails}/list/${id}`,{
        params: {page,size},
    });
    return response.data;
}
export default {getExam: getUserExams,getExamById,getExamByName,getExamByCode,getExamDetailsByExamId};