import axios from 'axios';
import { API_KEY,getToken } from '../config/Config.ts';
import { TimetableEntity } from '../types/Timetable.ts';

const api = `${API_KEY}/api/timetable`;
export const getTimeTableByGradeId = async (gradeId:number,page:number,size:number):Promise<TimetableEntity> => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/getTimeTable/${gradeId}`,{
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch(err){
    console.error(err)
    throw err;
  }

}
