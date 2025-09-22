
export const formatDateToInput = (isoString: any) => {
  if (!isoString) return "";
  const localDate = new Date(isoString);
  const localISOString = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
  return localISOString.slice(0, 16);
};

export const formatInputToISO = (inputValue:any) => {
  return new Date(inputValue).toISOString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};
export const formatDate1 = (dateString: string | null | undefined): string => {
  if (!dateString) return ""; // Xử lý trường hợp null hoặc undefined

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Kiểm tra xem có phải là ngày hợp lệ không

  return date.toISOString().split("T")[0]; // Format thành YYYY-MM-DD
};