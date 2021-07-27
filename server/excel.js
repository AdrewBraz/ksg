// @ts-check
import ExcelJS from 'exceljs';
import path from 'path';

const sheetBuilder = async (vmp, ksg, workbook) => {
  const translateVmpKeys = {
    FIO: 'ФИО',
    NAME: 'Наименование',
    GR_HMP: 'Группа',
    PRICE: 'Стоимость одной услуги',
    DAYS: 'Кол-во дней',
    DDS: 'Диагноз',
    C_I: 'ИБ',
    DATE_Z_1: 'Дата поступления',
    DATE_Z_2: 'Дата выписки',
    PODR_NAME: 'Отделение',
    C_T: 'Регион',

  };
  const translateKsgKeys = {
    FIO: 'ФИО',
    DS1: 'Диагноз',
    C_I: 'ИБ',
    GR: 'Группа',
    AGE: 'Возраст',
    FINAL_CODE: 'Код Прерывания',
    cod: 'Услуга',
    kz: 'Коэффицент затратности',
    ksgName: 'Название КСГ',
    N_KSG: 'Код КСГ',
    total: 'Cумма',
    DATE_Z_1: 'Дата поступления',
    DATE_Z_2: 'Дата выписки',
    KD_Z: 'Кол-во дней',
    PODR: 'Отделение',
    PODR_NAME: 'Код отделения',
    PATOLOGY: 'Соп. заболевание',
    C_T: 'Регион',
  };

  const vmpIncludeKeys = Object.keys(translateVmpKeys);
  const ksgIncludeKeys = Object.keys(translateKsgKeys);
  const vmpKeys = Object.keys(vmp[Object.keys(vmp)[0]]).filter((key) => vmpIncludeKeys.includes(key));
  const ksgKeys = Object.keys(ksg[Object.keys(ksg)[0]]).filter((key) => ksgIncludeKeys.includes(key));

  const vmpColumns = vmpKeys.map((key) => ({ name: translateVmpKeys[key], filterButton: true }));
  const ksgColumns = ksgKeys.map((key) => ({ name: translateKsgKeys[key], filterButton: true }));

  const ksgRows = Object.keys(ksg).reduce((acc, item) => {
    const values = Object.keys(ksg[item]).filter((item) => ksgIncludeKeys.includes(item)).map((key) => ksg[item][key]);
    acc.push(values);
    return acc;
  }, []);
  const vmpRows = Object.keys(vmp).reduce((acc, item) => {
    const values = Object.keys(vmp[item]).filter((item) => vmpIncludeKeys.includes(item)).map((key) => vmp[item][key]);
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
    .writeFile(path.join('C:/Users/User/Desktop/Выгрузка ФФОМС/', 'ФФОМС.xlsx'))
    .then(() => {
      console.log('saved');
    })
    .catch((err) => {
      console.log('err', err);
    });
};
