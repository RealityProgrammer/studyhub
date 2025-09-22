export const formatCurrency = (price: number): string => {
  return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
};
export const formatPriceInput = (value: string): number | null => {
  const cleanedValue = value.replace(/[^0-9.]/g, '');
  if (cleanedValue === '') return null;
  return parseFloat(cleanedValue);
};