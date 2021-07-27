// @ts-check

import Excel from 'exceljs';

export default async () => {
  const workbook = new Excel.Workbook();

  const data = await workbook.xlsx.readFile('D:/OMS_DB/xls/Interin_FOMS.xlsx')
    .then(() => {
      const worksheet = workbook.getWorksheet('Interin_FOMS');
      const obj = {};
      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) {
          return;
        }
        const [key, value] = row.values.slice(2, 4);
        obj[key] = value;
      });
      return obj;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
