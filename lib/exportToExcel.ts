import * as XLSX from 'xlsx';

interface Data {
  [key: string]: string | number;
}

const exportToExcel = (data: Data[], fileName: string): void => {
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export default exportToExcel;
