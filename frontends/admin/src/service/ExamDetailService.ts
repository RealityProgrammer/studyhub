import axios from "axios";
import {API_KEY,getToken} from '../config/Config.ts';
import { ExamDetails } from '../types/ExamDetails.ts';
const api = `${API_KEY}/api/exam_details`
export const getExamDetailsById = async (id:number,page:number,size:number):Promise<ExamDetails[]> =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list/${id}`,{
      params:{page,size},
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch(err){
    console.error(err);
    throw err;
  }
}
export const addExamDetails = async (examDetails:ExamDetails) =>{
  const token = getToken();
  try {
    const response = await axios.post(`${api}/create`,examDetails,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error){
    console.error(error);
    throw error;
  }
}
export const deleteExamDetails = async (id:number) =>{
  const token = getToken();
  try {
    const response = await axios.delete(`${api}/delete/${id}`,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error){
    console.error(error);
    throw error;
  }
}
export const findExamDetailsById = async (id:number) =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/findById/${id}`,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error){
    console.error(error);
    throw error;
  }
}
export const updateExamDetails = async (id:number,data:ExamDetails) =>{
  const token = getToken();
  try {
    const response = await axios.put(`${api}/update/${id}`,data,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error){
    console.error(error);
    throw error;
  }
}