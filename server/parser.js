import Excel from 'exceljs';

const getRandomArbitrary = (min, max) => Math.floor((Math.random() * (max - min) + min));
const vmpCodes = [200409, 200510, 200518, 200519, 200520, 200524, 200522, 200523, 200524, 200525, 200530];

export default async (path) => {
  const workbook = new Excel.Workbook();
  console.log(path);
  const data = await workbook.xlsx.readFile(path)
    .then(() => {
      const worksheet = workbook.getWorksheet('Лист1');
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
  return data;
};
