import axios from "axios";
import { API_KEY, getToken } from '../config/Config.ts';
import { Exam } from '../types/Exam.ts';
import { toast } from 'react-toastify';
import error = toast.error;
const api = `${API_KEY}/api/exam`;
export const getAllExams = async (page:number,size:number) =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list`,{
      params:{page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}

export const addExam = async (examDto:Exam) =>{
  const token = getToken();
  try {
    const response = await axios.post(`${api}`,examDto,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const updateExam = async (id:number,examDto:Exam) =>{
  const token = getToken();
  try {
    const response = await axios.put(`${api}/update/${id}`,examDto,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (e) {
    console.error(e);
    throw error;
  }
}
export const findExamById = async (id:number) =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/findById/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const deleteExamById = async (id:number) =>{
  const token = getToken();
  try {
    const response = await axios.delete(`${api}/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const findByNameAndCode = async (filter:any,page:number,size:number) =>{
  const token = getToken();
  const param = {
    code:filter.code,
    name:filter.name,
    page:page,
    size:size
  }
  try {
    const response = await axios.get(`${api}/findByAttribute`,{
      params:param,
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}

