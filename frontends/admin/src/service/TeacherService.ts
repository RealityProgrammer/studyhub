import axios from 'axios';
import { API_KEY,getToken } from '../config/Config.ts';
import { Teacher } from '../types/Teacher.ts';

const api = `${API_KEY}/api/inforTeacher`;
export const getAllTeacher = async (page:number,size:number):Promise<Teacher> => {
    const token = getToken();
    try {
      const response = await axios.get(`${api}/list`,{
        params: { page, size },
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return response.data;
    }catch(err){
      console.error(err)
      throw err;
    }
}
export const getInforTeacherById = async (id:number) =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/findById/${id}`,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch(err){
    console.error(err)
    throw err;
  }
}
export const updateTeacher = async (id:number,formData:FormData) =>{
  const token = getToken();
  try {
    const response = await axios.put(`${api}/update/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}