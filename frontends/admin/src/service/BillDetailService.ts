import axios from "axios";
import { API_KEY, getToken } from '../config/Config.ts';
import { IBillDetail } from '../types/BillDetail.ts';
const api=`${API_KEY}/api/bill_details`;
export const getAllByBillId =async (page:number,size:number,id:number):Promise<IBillDetail> =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list/${id}`,{
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
