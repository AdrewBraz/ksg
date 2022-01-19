import { findIndex } from 'lodash';

const reg = new RegExp(/\w\d\d$/);
const replaceDs = (ds) => (ds === 'I10' ? ds : ds.replace(reg, '$&.0'));

const replaceOrg = (org) => (['201', '203', '204', '206', '211', '215', '216', null].includes(org) ? '198' : org);

const replaceDoc = (cod) => {
  switch (cod) {
    case '36665':
      return '22061';
    case '33944':
      return '12543';
    case '37830':
      return '12543';
    case '20881':
      return '32862';
    case '12364':
      return '32862';
    case '34470':
      return '35744';
    case '40017':
      return '';
    case '39777':
      return '32042';
    case '39089':
      return '32042';
    case '39301':
      return '32042';
    case '34430':
      return '32042';
    case '36445':
      return '32042';
    case '36467':
      return '21681';
    case '28918':
      return '34322';
    case '18463':
      return '34322';
    case null:
      return '22023';
    default:
      return cod;
  }
};

const medicalServList = (list, interin) => {
  let patient;
  let ds;

  const l1 = list.filter((el) => interin[`${el.SRV_ID}`] !== undefined).map((el) => {
    const {
      SRV_ID, COD_U, DS, ORG_ID,
    } = el;
    const diag = !DS ? 'I10' : replaceDs(DS);
    const doc = replaceDoc(COD_U);
    const org = replaceOrg(ORG_ID);
    const cod = interin[`${SRV_ID}`];
    return {
      ...el, DS: diag, COD_U: doc, ORG_ID: org, COD: cod, MU_TYPE: '1', IS_PRIM: '1',
    };
  });
  const l2 = l1.reduce((acc, item) => {
    const { PATIENT, D_U, COD } = item;
    const index = findIndex(acc, { PATIENT, D_U, COD });
    if (index < 0) {
      acc.push(item);
      return acc;
    }
    const { K_U } = acc[index];
    acc[index].K_U = K_U + 1;
    return acc;
  }, []);
  return l2;
};

export { medicalServList };
