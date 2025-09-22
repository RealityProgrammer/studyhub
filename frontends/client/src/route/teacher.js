import axiosInstance from "../route/interceptor.js";
const api = '/api/inforTeacher';
const apiCourse = '/api/course';

async function getAllTeacher(page,size) {
    const response = await axiosInstance.get(`${api}/list`,{
        params: {page, size},
    });
    return response.data;
}
async function getInforTeacher(id) {
    const response = await axiosInstance.get(`${api}/findById/${id}`);
    return response.data;
}
async function getAllCourseByEmail(page,size,email) {
    const response = await axiosInstance.get(`${apiCourse}/findCourseByEmailTeacher`,{
        params: {page, size,email},
    })
    return response.data;
}
export default {getAllTeacher,getInforTeacher,getAllCourseByEmail};