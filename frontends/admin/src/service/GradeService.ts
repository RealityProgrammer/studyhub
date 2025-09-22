import axios from "axios";
import { API_KEY, getToken } from "../config/Config";
import { Grade } from "../types/Grade";

const api = `${API_KEY}/api/grade`;

export const getGrades = async (page:number, size:number): Promise<Grade[]> => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list`,{
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const createDiscord = async (channelName :string):Promise<any> => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_KEY}/dis`,{
      params: { channelName },
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response;
  }catch(err){
    throw err;
  }

}
export const findGradeById = async (id:number) => {
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
export const findByUser = async (req) => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/findByUser`, {
      params: req,
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}

export const deleteGrade = async (id:number) => {
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

export const addGrade = async (grade: Grade) => {
  const token = getToken();
  try{
    const response = await axios.post(`${api}`, grade, {
      headers: {'Authorization': `Bearer ${token}`}
    })
    return response.data;
  }catch(error){
    console.log(error);
    throw error;
  }
}

export const updateGrade = async (req :any) => {
  const token = getToken();
  try {
    const response = await axios.put(`${api}/update/${req.id}`,req,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}

export const addStudentIntoGrade = async (req: any) => {
  const token = getToken();

  try {
    const response = await axios.put(
      `${api}/addStudentIntoGrade/${req.id}`,
      req.studentEmails,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error :any) {
    console.error("Lỗi gọi API:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteStudentOuttoGrade = async (req: any) => {
  const token = getToken();
  try {
    const response = await axios.put(
      `${api}/deleteStudentOuttoGrade/${req.id}/${req.studentEmail}`,{},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error :any) {
    console.error("Lỗi gọi API:", error.response?.data || error.message);
    throw error;
  }
};