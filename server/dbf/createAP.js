import { DBFFile } from 'dbffile';

export default async (list) => {
  const fieldDescriptors = [
    { name: 'AP_ID', type: 'C', size: 36 },
    { name: 'PATIENT', type: 'C', size: 36 },
    { name: 'AP_TYPE', type: 'C', size: 1 },
    { name: 'N_NAP', type: 'C', size: 50 },
    { name: 'D_NAP', type: 'D', size: 8 },
    { name: 'DS_NAP', type: 'C', size: 6 },
    { name: 'ORGAN', type: 'C', size: 10 },
    { name: 'CHD', type: 'D', size: 8 },
  ];

  const records = list.length === 0
    ? [{
      AP_ID: '',
      PATIENT: '',
      AP_TYPE: '',
      N_NAP: '',
      D_NAP: new Date(),
      DS_NAP: '',
      ORGAN: '',
      CHD: new Date(),
    }]
    : list.map((item) => {
      const {
        AP_ID, PATIENT, AP_TYPE, D_NAP, DS_NAP, ORGAN,
      } = item;
      const N_NAP = item.N_NAP ? item.N_NAP.replace(/\./g, '') : '""';
      return {
        AP_ID: AP_ID || '',
        PATIENT: PATIENT ? `${PATIENT}` : '',
        AP_TYPE: AP_TYPE || '',
        N_NAP: N_NAP || '',
        D_NAP,
        DS_NAP: DS_NAP || '',
        ORGAN: ORGAN || '',
        CHD: new Date(),
      };
    });

  const dbf = await DBFFile.create(`${__dirname}/AP.dbf`, fieldDescriptors);
  console.log('DBF file created.');
  await dbf.appendRecords(records);
  console.log(`${records.length} records added.`);
};
