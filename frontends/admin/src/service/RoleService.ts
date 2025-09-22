import axios from "axios";
import { API_KEY, getToken } from '../config/Config.ts';
import { Role } from '../types/Role.ts';
const api=`${API_KEY}/api/role`;
export const getAllRole = async (page:number, size:number): Promise<Role[]> => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list`, {
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteRole = async (id:number) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${api}/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getRoleById = async (id:number) => {
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
export const updateRole = async (id:number, role: Role) => {
  const token = getToken();
  try {
    const response = await axios.put(`${api}/update/${id}`, role, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const addRole =async (role:Role) => {
  const token = getToken();
  try {
    const response = await axios.post(`${api}/create`,role, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}