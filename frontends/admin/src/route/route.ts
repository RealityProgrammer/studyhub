import axiosInstance from "./interceptor.ts";

export async function getUser () {
  const decodedResponse = await axiosInstance.get('/api/account/getUser');
  return decodedResponse.data;
}
