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
    C_I: 'ИБ',
    AGE: 'Возраст',
    out_date: 'Дата выписки',
    C_T: 'Страховая принадлежность',
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
    PATOLOGY: 'Тяжелое сопутствующее заболевание',
    total: 'Cумма',
    out_date: 'Дата выписки',
    C_T: 'Страховая принадлежность',
  };
  const vmpColumns = vmpKeys.map((key) => {
    if (key === 'out_date') {
      return { name: translateVmpKeys[key], filterButton: true, style: { numFmt: 'dd.mm.yy' } };
    }
    return { name: translateVmpKeys[key], filterButton: true };
  });

  const ksgColumns = ksgKeys.map((key) => ({ name: translateKsgKeys[key], filterButton: true }));
  const ksgRows = Object.keys(ksg).reduce((acc, item) => {
    const values = Object.values(ksg[item]);
    acc.push(values);
    return acc;
  }, []);
  const vmpRows = Object.keys(vmp).reduce((acc, item) => {
    const values = Object.values(vmp[item]);
    acc.push(values);
    return acc;
  }, []);
  const worksheet = workbook.addWorksheet('ВМП');
  worksheet.headerFooter.differentFirst = true;
  worksheet.headerFooter.firstHeader = 'VMP';
  worksheet.addTable({
    name: 'MyTable',
    ref: 'A1',
    headerRow: true,
    totalsRow: true,
    displayName: 'medgroup',
    columns: vmpColumns,
    rows: vmpRows,
  });

  const worksheetKsg = workbook.addWorksheet('КСГ');
  worksheetKsg.headerFooter.differentFirst = true;
  worksheetKsg.headerFooter.firstHeader = 'КСГ';
  worksheetKsg.addTable({
    name: 'MyTable2',
    ref: 'A1',
    headerRow: true,
    totalsRow: true,
    displayName: 'medgroup',
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
