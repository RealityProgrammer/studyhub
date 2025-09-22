import axios from "axios";
import { API_KEY,getToken } from '../config/Config.ts';
import { Certificate } from '../types/Certificate.ts';

const api = `${API_KEY}/api/certificate`
export const getAllCertificates = async (page:number,size:number):Promise<Certificate> => {
  const token = getToken();
  try {
    const response = await axios.get(`${api}/list`,{
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  }catch(err) {
    console.error(err);
    throw err;
  }
}
export const addCertificate = async (certificate:Certificate) => {
  const token = getToken();
  try {
    const response = await axios.post(`${api}/create`,certificate,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const findCertificateById = async (id:number) => {
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
export const updateCertificate = async (id:number, certificate:Certificate) => {
  const token = getToken();
  try {
    const response = await axios.put(`${api}/update/${id}`,certificate,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.data;
  }catch (error) {
    console.error(error);
    throw error;
  }
}
export const deleteCertificateById = async (id:number) => {
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
export const getCertificatesByAtribute = async (filters: any, page: number, size: number) => {
  const token = getToken();
  const params = {
    certificateName: filters.certificateName || '',
    issuingOrganization: filters.issuingOrganization || '',
    certificateType: filters.certificateType || '',
    certificateNumber: filters.certificateNumber || '',
    page: page,
    size: size,
  };

  try {
    const response = await axios.get(`${api}/findByAttribute`, {
      headers: { 'Authorization': `Bearer ${token}` },
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCertificateByEmail = async (page:number,size:number) =>{
  const token = getToken();
  try {
    const response = await axios.get(`${api}/findCertificateByEmail`,{
      params: { page, size },
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  }catch(err) {
    console.error(err);
    throw err;
  }

}