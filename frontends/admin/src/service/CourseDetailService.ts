import axios from "axios";
import { API_KEY,getToken } from '../config/Config.ts';
import { CourseDetails } from '../types/CourseDetails.ts';

const api = `${API_KEY}/api/coursedetails`
export const getCourseDetails = async (id:number,page:number,size:number) => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list/${id}`, {
      params:{page, size},
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch(err) {
    console.log(err);
    throw err;
  }
};
export const updateCourseDetails = async (id:number,courseDetailsDto:CourseDetails) =>{
  const token = getToken();
  try {
    const response = await axios.put(`${api}/update/${id}`,courseDetailsDto,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error){
    console.error(error)
    throw error;
  }
};
export const findById = async (id:number) =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/findById/${id}`,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data
  }catch (error){
    console.error(error)
    throw error;
  }
}
export const deleteCourseDetail= async (id:number) =>{
  const token = getToken();
  try {
    const response = await axios.delete(`${api}/delete/${id}`,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error){
    console.error(error)
    throw error;
  }
}
export const addCourseDetails = async (courseDetailsDto:CourseDetails) =>{
  const token = getToken();
  try {
    const response = await axios.post(`${api}`,courseDetailsDto,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error){
    console.error(error)
    throw error;
  }
}