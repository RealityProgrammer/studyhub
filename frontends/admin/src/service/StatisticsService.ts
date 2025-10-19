import { API_KEY, getToken } from '../config/Config.ts';
import axios from 'axios';

const api = `${API_KEY}/api/statistics`;

export const getMonthlyRevenue = async (year: number) : Promise<number[]> => {
  const token = getToken();

  try {
    const response = await axios.get(`${api}/monthly-revenue`,{
      params: { year },
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}