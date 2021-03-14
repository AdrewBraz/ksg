import Excel from 'exceljs';
import path from 'path';

export default async () => {
  const workbook = new Excel.Workbook();
  const data = await workbook.xlsx.readFile(`${__dirname}/uploads/kslpList.xlsx`)
    .then(() => {
      const worksheet = workbook.getWorksheet('kslpList');
      const arr = [];
      const keys = [];
      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) {
          row.values.slice(1).forEach((element) => {
            keys.push(element);
          });
        } else {
          const obj = {};
          row.values.slice(1).forEach((item, i) => {
            obj[keys[i]] = item;
          });
          arr.push(obj);
        }
      });
      return arr;
    })
    .catch((err) => {
      console.log(err);
    });
  const diab = data.filter( item => /диабет/gi.test(item.DS)).map(item => `2021_${item.C_I}`);
  const hyper = data.filter( item => /легочная гипертензия/gi.test(item.DS)).map(item => `2021_${item.C_I}`);
  const hiv = data.filter( item => /I27.8 Легочная артериальная гипертензия, ассоциированная с ВИЧ-инфекцией/gi.test(item.DS)).map(item => `2021_${item.C_I}`);
  return { diab, hyper, hiv };
};