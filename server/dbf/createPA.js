import { DBFFile } from 'dbffile';

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

export default async (list) => {
  const fieldDescriptors = [
    { name: 'PATIENT', type: 'C', size: 36 },
    { name: 'FAM', type: 'C', size: 30 },
    { name: 'IM', type: 'C', size: 25 },
    { name: 'OT', type: 'C', size: 25 },
    { name: 'DR', type: 'D', size: 8 },
    { name: 'W', type: 'C', size: 1 },
    { name: 'SNILS', type: 'C', size: 14 },
    { name: 'MCOD', type: 'C', size: 15 },
    { name: 'STAT_Z', type: 'C', size: 2 },
    { name: 'PLACE_W', type: 'C', size: 150 },
    { name: 'PLACE', type: 'C', size: 254 },
    { name: 'PHONE', type: 'C', size: 20 },
    { name: 'INVAL', type: 'C', size: 1 },
    { name: 'C_OKSM', type: 'C', size: 3 },
    { name: 'D_TYPE', type: 'C', size: 1 },
    { name: 'CHD', type: 'D', size: 8 },
  ];

  const records = list.map((item) => {
    const {
      PATIENT, FAM, IM, OT, DR, W, SNILS, STAT_Z, PLACE_W, PLACE, PHONE, INVAL, C_OKSM, D_TYPE,
    } = item;
    const snilsTemp = SNILS ? (SNILS).replace(/\s/, '').replace(/-/g, '') : null;
    return {
      PATIENT: `${PATIENT}`,
      FAM: `${FAM}`,
      IM: `${IM}`,
      OT: OT ? `${OT}` : '',
      DR: DR.addHours(4),
      W: `${W}`,
      SNILS: snilsTemp ? `${snilsTemp.slice(0, 3)}-${snilsTemp.slice(3, 6)}-${snilsTemp.slice(6, 9)} ${snilsTemp.slice(9)}` : '',
      MCOD: '4144978_1',
      STAT_Z: STAT_Z ? `${STAT_Z}` : '',
      PLACE_W: `${PLACE_W}`,
      PLACE: PLACE ? `${PLACE}` : 'ГОР. МОСКВА',
      PHONE: PHONE ? `${PHONE}` : '',
      INVAL: INVAL ? `${INVAL}` : '',
      C_OKSM: '',
      D_TYPE: '',
      CHD: new Date(),
    };
  });

  const dbf = await DBFFile.create('C:/Users/User/Desktop/Мегаклиника/PA.dbf', fieldDescriptors, { encoding: 'cp866' });
  console.log('DBF file created.');
  await dbf.appendRecords(records);
  console.log(`${records.length} records added.`);
};
