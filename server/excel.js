// @ts-check
import ExcelJS from 'exceljs';
import path from 'path';

const sheetBuilder = async (vmp, ksg, workbook) => {
  const vmpKeys = Object.keys(vmp[Object.keys(vmp)[0]]);
  const ksgKeys = Object.keys(ksg[Object.keys(ksg)[0]]);
  const translateVmpKeys = {
    NAME: 'Наименование',
    GROUP: 'Группа',
    PRICE: 'Стоимость одной услуги',
    FIO: 'ФИО',
    DDS: 'Диагноз',
    AGE: 'Возраст',
  };
  const translateKsgKeys = {
    FIO: 'ФИО',
    DDS: 'Диагноз',
    C_I: 'ИБ',
    group: 'Группа',
    AGE: 'Возраст',
    FINAL_CODE: 'Код Прерывания',
    COD: 'Услуга',
    kz: 'Коэффицент затратности',
    ksgName: 'Название КСГ',
    ksg: 'Код КСГ',
    total: 'Cумма',
  };
  const vmpColumns = vmpKeys.map((key) => ({ name: translateVmpKeys[key], filterButton: true }));
  const ksgColumns = ksgKeys.map((key) => ({ name: translateKsgKeys[key], filterButton: true }));
  const ksgRows = Object.keys(ksg).reduce((acc, item) => {
    const values =  Object.values(ksg[item]);
    acc.push(values);
    return acc
}, [])
const vmpRows = Object.keys(vmp).reduce((acc, item) => {
    const values =  Object.values(vmp[item]);
    acc.push(values);
    return acc
}, [])
  const worksheet = workbook.addWorksheet('КСГ');
  worksheet.headerFooter.differentFirst = true;
  worksheet.headerFooter.firstHeader = 'КСГ';
  worksheet.addTable({
    name: 'MyTable',
    ref: 'A1',
    headerRow: true,
    totalsRow: true,
    displayName: 'medgroup',
    columns: vmpColumns,
    rows: vmpRows,
  });

  worksheet.addTable({
    name: 'MyTable4',
    ref: 'K1',
    headerRow: true,
    totalsRow: true,
    columns: ksgColumns,
    rows: ksgRows,
  });
};

export default async (vmp, ksg) => {
  const workbook = new ExcelJS.Workbook();
  sheetBuilder(vmp, ksg, workbook);
  await workbook
    .xlsx
    .writeFile(path.join(__dirname, './export.xlsx'))
    .then(() => {
      console.log('saved');
    })
    .catch((err) => {
      console.log('err', err);
    });
};
