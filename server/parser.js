import Excel from 'exceljs';
import interinController from '../controller/interinController';

export default async (path) => {
  const workbook = new Excel.Workbook();
  const interinCodes = await interinController();
  console.log(path)
  const data = await workbook.xlsx.readFile(path)
    .then(() => {
      const worksheet = workbook.getWorksheet('st');
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
          const interin = interinCodes.filter(item => item.COD === obj.SRV_CODE);
          obj.SRV_CODE = interin.length > 0 ? interin[0].COD_USL : null;
          arr.push(obj);
        }
      });
      return arr;
    })
    .catch((err) => {
      console.log(err);
    });

  return data.filter(item => item.DDS !== 'U07.1' && item.DDS !== 'U07.2')
};
