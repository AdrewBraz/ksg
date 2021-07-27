import { DBFFile } from 'dbffile';
import iconv from 'iconv-lite';
import fs from 'fs';

export default async (list) => {
  const fieldDescriptors = [
    { name: 'PATIENT', type: 'C', size: 36 },
    { name: 'S_POL', type: 'C', size: 16 },
    { name: 'SN_POL', type: 'C', size: 16 },
    { name: 'C_T', type: 'C', size: 2 },
    { name: 'Q_OGRN', type: 'C', size: 15 },
    { name: 'T_POL', type: 'C', size: 1 },
    { name: 'QD_NAME', type: 'C', size: 254 },
    { name: 'DATE_N', type: 'D', size: 8 },
    { name: 'DATE_E', type: 'D', size: 8 },
    { name: 'POL_S', type: 'C', size: 1 },
    { name: 'CHD', type: 'D', size: 8 },
  ];

  const records = list.map((item) => {
    const {
      PATIENT, S_POL, SN_POL, C_T, Q_OGRN, DATE_EN, DATE_E, POL_S, QD_NAME,
    } = item;
    let OGRN;
    if (QD_NAME === 'ИКАР') {
      OGRN = '1027806865481';
    } else if (!Q_OGRN) {
      OGRN = '1027739099772';
    } else if (Q_OGRN === '1027739051460') {
      OGRN = '1177746612581';
    } else if (Q_OGRN === '1027739815245') {
      OGRN = '1177746612581';
    } else {
      OGRN = Q_OGRN;
    }
    const date = new Date('12.31.2074');
    const dateExp = !DATE_E ? DATE_E : (DATE_E.getTime() > date.getTime() ? date : DATE_E);
    return {
      PATIENT: `${PATIENT}`,
      S_POL,
      SN_POL,
      C_T: C_T || '77',
      Q_OGRN: OGRN,
      T_POL: SN_POL.length === 16 ? '5' : '1',
      QD_NAME: QD_NAME || 'РЕЗЕРВНАЯ СТРАХОВАЯ КОМПАНИЯ',
      DATE_EN,
      DATE_E: dateExp,
      POL_S,
      CHD: new Date(),
    };
  });

  const dbf = await DBFFile.create('C:/Users/User/Desktop/Мегаклиника/PO.dbf', fieldDescriptors, { encoding: 'win1251' });
  console.log('DBF file created.');
  await dbf.appendRecords(records);
  console.log(`${records.length} records added.`);
};
