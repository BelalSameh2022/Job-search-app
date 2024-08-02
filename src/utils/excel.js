import xlsx from "xlsx";

export const createExcelSheet = (data, sheetName, fileName) => {
  const workSheet = xlsx.utils.json_to_sheet(data);
  const workBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workBook, workSheet, sheetName);
  xlsx.writeFile(workBook, `${fileName}.xlsx`);
};
