import axiosInstance from "../route/interceptor.js";

async function login (req) {
    const response = await axiosInstance.post('/auth/login', req);
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    return getUser()
}
async function signUp (req) {
    const response = await axiosInstance.post('/auth/signup', req);
    return response.data;
}
async function verifyOtp (req) {
    const response = await axiosInstance.post('/auth/verify', req);
    return response.data;
}
async function getUser () {
    const decodedResponse = await axiosInstance.get('/api/account/getUser');
    if(decodedResponse.data.code  === 401) {
        alert("Vui lòng đăng nhập!")
    }else {
        return decodedResponse.data;
    }
}
async function resendCode(req){
    const response = await axiosInstance.post(`/auth/resend?email=${req}`);
}
async function getCategory () {
    const response = await axiosInstance.get(`/api/category/list`);
    return response.data;
}
async function getTimetable (req) {
    const response = await axiosInstance.get(`/api/timetable/getTimeTable/${req}`);
    return response.data;
}
async function getCourse (req) {
    const params = new URLSearchParams(req)
    const response = await axiosInstance.get(`/api/course/findByCondition`, {params});
    return response.data;
}
async function getCourseBestSeller () {
    const response = await axiosInstance.get(`/api/course/getBestseller`);
    return response.data;
}
async function getCourseDetails (req) {
    const response = await axiosInstance.get(`/api/coursedetails/list/`+req);
    return response.data;
}
async function getGradeByCourseId (req) {
    const params = new URLSearchParams(req)
    const response = await axiosInstance.get(`/api/grade/findByCourse`,{params});
    return response.data;
}
async function signInGrade (req) {
    const response = await axiosInstance.put(`/api/grade/signInGrade/`+req);
    return response.data;
}
async function getGradeByCourseAndUser(req){
    const params = new URLSearchParams(req)
    const response = await axiosInstance.get(`/api/grade/findByCourseAndUser`,{params});
    return response.data;
}
export default {login,getTimetable,getGradeByCourseAndUser, getUser,signUp, verifyOtp,resendCode, getCategory, getCourse,getCourseBestSeller,getCourseDetails,getGradeByCourseId,signInGrade};