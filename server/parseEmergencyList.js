import Excel from 'exceljs';

export default async () => {
  const workbook = new Excel.Workbook();
  const data = await workbook.xlsx.readFile(`${__dirname}/uploads/EmergencyList.xlsx`)
    .then(() => {
      const worksheet = workbook.getWorksheet('List');
      const arr = [];
      const keys = [];
      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) {
          return arr
        } else {
          arr.push(row.values.slice(1)[0])
        }
      });
      return arr;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};