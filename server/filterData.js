import parseKslp from './parseKslp';
import parseEmergencyList from './parseEmergencyList';

const vmpCodes = ['200409', '200510', '200518', '200519', '200520', '200524', '200522', '200523', '200524', '200525', '200530'];

export default async (data) => {
  const splitOmsData = data.reduce((acc, item) => {
    vmpCodes.includes(item.COD) ? acc.vmpList.push(item) : acc.ksgList.push(item);
    return acc;
  }, { vmpList: [], ksgList: [] });
  const { ksgList, vmpList } = splitOmsData;
  const emergencyList = await parseEmergencyList();
  const { diab, hiv, hyper } = await parseKslp();
  const ksgFilteredEmergency = ksgList.filter((item) => !emergencyList.includes(item.C_I));
  const vmpFilteredEmergency = vmpList.filter((item) => !emergencyList.includes(item.C_I));
  const ksgDataExcel = ksgFilteredEmergency.map((item) => {
    if (diab.includes(item.C_I)) {
      item.PATOLOGY = 'Диабет';
    } else if (hyper.includes(item.C_I)) {
      item.PATOLOGY = 'Легочная гипертензия';
    } else if (hiv.includes(item.C_I)) {
      item.PATOLOGY = 'I27.8 Легочная артериальная гипертензия, ассоциированная с ВИЧ-инфекцией';
    } else {
      item.PATOLOGY = '';
    }
    return item;
  }).map((item) => {
    if (item.C_T === '77') {
      item.C_T = 'Москва';
    } else {
      item.C_T = 'Иногород';
    }
    return item;
  });

  const vmpDataExcel = vmpFilteredEmergency.map((item) => {
    if (item.C_T === '77') {
      item.C_T = 'Москва';
    } else {
      item.C_T = 'Иногород';
    }
    return item;
  });

  return { vmpList: vmpDataExcel, ksgList: ksgDataExcel };
};
