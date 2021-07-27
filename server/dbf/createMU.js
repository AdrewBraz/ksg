import { DBFFile } from 'dbffile';

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

export default async (list) => {
  const fieldDescriptors = [
    { name: 'PATIENT', type: 'C', size: 36 },
    { name: 'COD_U', type: 'C', size: 36 },
    { name: 'PROG', type: 'C', size: 10 },
    { name: 'DS', type: 'C', size: 6 },
    { name: 'D_U', type: 'D', size: 8 },
    { name: 'P_U', type: 'C', size: 1 },
    { name: 'COD', type: 'C', size: 6 },
    {
      name: 'K_U', type: 'N', size: 6, length: 2,
    },
    { name: 'ISHOD', type: 'C', size: 3 },
    { name: 'RSLT', type: 'C', size: 3 },
    { name: 'CH_N', type: 'C', size: 1 },
    { name: 'DISP', type: 'C', size: 1 },
    { name: 'TRAVMA', type: 'C', size: 2 },
    { name: 'D_TYPE', type: 'C', size: 3 },
    { name: 'AP_ID', type: 'C', size: 36 },
    { name: 'C_I', type: 'C', size: 30 },
    { name: 'ND', type: 'N', size: 9 },
    { name: 'MU_TYPE', type: 'C', size: 1 },
    { name: 'IS_PRIM', type: 'C', size: 1 },
    { name: 'CHD', type: 'D', size: 8 },
  ];

  const records = list.map((item) => {
    const {
      PATIENT, COD, COD_U, K_U, DS, D_U, C_I, MU_TYPE, IS_PRIM, PROG,
    } = item;
    return {
      PATIENT: `${PATIENT}`,
      DS: !DS ? 'I10' : `${DS}`,
      COD,
      COD_U: COD_U || '32042',
      K_U,
      P_U: '1',
      D_U: D_U.addHours(4),
      ISHOD: '1',
      RSLT: '2',
      CH_N: '1',
      DISP: '1',
      TRAVMA: '',
      D_TYPE: '',
      AP_ID: '',
      C_I: `${C_I}`,
      ND: 0,
      MU_TYPE,
      IS_PRIM,
      PROG,
      CHD: new Date(),
    };
  });

  const dbf = await DBFFile.create('C:/Users/User/Desktop/Мегаклиника/MU.dbf', fieldDescriptors, { encoding: 'cp866' });
  console.log('DBF file created.');
  await dbf.appendRecords(records);
  await DBFFile.open(`${__dirname}/MU.dbf`, { encoding: 'win1251' });
  console.log(`${records.length} records added.`);
};
