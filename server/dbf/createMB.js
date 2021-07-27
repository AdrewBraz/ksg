import { DBFFile } from 'dbffile';

export default async (list) => {
  const fieldDescriptors = [
    { name: 'PATIENT', type: 'C', size: 36 },
    { name: 'C_I', type: 'C', size: 30 },
    { name: 'T_CI', type: 'C', size: 2 },
    { name: 'MB_STAT', type: 'C', size: 2 },
    { name: 'DORD_N', type: 'C', size: 30 },
    { name: 'AP_ID', type: 'C', size: 36 },
    { name: 'H_TYP', type: 'C', size: 1 },
    { name: 'SRC', type: 'C', size: 2 },
    { name: 'ORD', type: 'C', size: 1 },
    { name: 'ISHOD', type: 'C', size: 3 },
    { name: 'RSLT', type: 'C', size: 3 },
    { name: 'PROG', type: 'C', size: 10 },
    { name: 'TRAVMA', type: 'C', size: 2 },
    { name: 'DS_P', type: 'C', size: 6 },
    { name: 'DS', type: 'C', size: 6 },
    { name: 'DS_S', type: 'C', size: 6 },
    { name: 'DS_O', type: 'C', size: 6 },
    { name: 'VMPAP_ID', type: 'C', size: 36 },
    { name: 'CHD', type: 'D', size: 8 },
  ];

  const records = list.map((item) => {
    const {
      PATIENT, C_I,
    } = item;

    return {
      PATIENT: `${PATIENT}`,
      C_I: `${C_I}`,
      T_CI: '01',
      MB_STAT: '01',
      DORD_N: '',
      AP_ID: '',
      H_TYP: '',
      SRC: '10',
      ORD: '4',
      ISHOD: '',
      RSLT: '',
      PROG: '',
      TRAVMA: '',
      DS_P: '',
      DS: '',
      DS_S: '',
      DS_0: '',
      VMPAP_ID: '',
      CHD: new Date(),
    };
  });

  const dbf = await DBFFile.create('C:/Users/User/Desktop/Мегаклиника/MB.dbf', fieldDescriptors, { encoding: 'cp866' });
  console.log('DBF file created.');
  await dbf.appendRecords(records);
  console.log(`${records.length} records added.`);
};
