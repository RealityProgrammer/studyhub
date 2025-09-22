import axios from "axios";
import { API_KEY, getToken } from '../config/Config.ts';
import { IBill } from '../types/Bill.ts';
const api=`${API_KEY}/api/bill`;
export const getAllBill =async (page:number,size:number):Promise<IBill> =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list`,{
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const deleteBill = async (id:number) =>{
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
export const findBillByAttribute = async (filter:any,page:number,size:number) =>{
  const token = getToken();
  const params = {
    code:filter.code,
    accountName:filter.accountName,
    page:page,
    size:size,
  }
  try {
    const response = await axios.get(`${api}/findBillByAttribute`, {
      headers: { 'Authorization': `Bearer ${token}` },
      params:params
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
