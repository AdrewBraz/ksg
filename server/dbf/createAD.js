import { DBFFile } from 'dbffile';
import iconv from 'iconv-lite';
import fs from 'fs';

export default async (list) => {
  const fieldDescriptors = [
    { name: 'PATIENT', type: 'C', size: 36 },
    { name: 'TIP_ADR', type: 'C', size: 1 },
    { name: 'AD_ST', type: 'C', size: 3 },
    { name: 'CA_C', type: 'C', size: 2 },
    { name: 'C_A', type: 'C', size: 2 },
    { name: 'RN_C', type: 'C', size: 2 },
    { name: 'RN', type: 'C', size: 80 },
    { name: 'GOR_C', type: 'C', size: 2 },
    { name: 'GOR', type: 'C', size: 80 },
    { name: 'UL_C', type: 'C', size: 2 },
    { name: 'UL', type: 'C', size: 80 },
    { name: 'DOM', type: 'C', size: 10 },
    { name: 'KOR', type: 'C', size: 10 },
    { name: 'STR', type: 'C', size: 10 },
    { name: 'KV', type: 'C', size: 5 },
    { name: 'CHD', type: 'D', size: 8 },
  ];

  const records = list.map((item) => {
    const {
      PATIENT, TIP_ADR, AD_ST, CA_C, C_A, RN_C, RN, GOR_C, GOR, UL_C, UL, DOM, KOR, STR, KV,
    } = item;

    return {
      PATIENT: `${PATIENT}`,
      TIP_ADR: TIP_ADR ? `${TIP_ADR}` : '',
      AD_ST: '643',
      CA_C: CA_C ? `${CA_C}` : '',
      C_A: C_A ? `${C_A}` : '',
      RN_C: RN_C ? `${RN_C}` : '',
      RN: RN ? `${RN}` : '',
      GOR_C: GOR_C ? `${GOR_C}` : '',
      GOR: GOR ? `${GOR}` : '',
      UL_C: UL_C ? `${UL_C}` : '',
      UL: UL ? `${UL}` : '',
      DOM: DOM ? `${DOM}` : '',
      KOR: KOR ? `${KOR}` : '',
      STR: STR ? `${STR}` : '',
      KV: KV ? `${KV}` : '',
      CHD: new Date(),
    };
  });

  const dbf = await DBFFile.create('C:/Users/User/Desktop/Мегаклиника/AD.dbf', fieldDescriptors, { encoding: 'cp866' });
  console.log('DBF file created.');
  await dbf.appendRecords(records);
  console.log(`${records.length} records added.`);
};
