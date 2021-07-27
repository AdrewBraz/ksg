import { sr } from 'date-fns/locale';
import interinController from '../controller/interinController';
import { allUsl } from '../controller/index';
import { allUsl as allDayUsl } from '../controller/ds';

const vmpCodes = ['200409', '200510', '200518', '200519', '200520', '200524', '200522', '200523', '200525', '200530'];

export default async (data, kslp) => {
  const interinCodes = await interinController();
  const hospServList = await allUsl();
  const dayServList = await allDayUsl();
  const splitOmsData = data.reduce((acc, item) => {
    vmpCodes.includes(item.COD) ? acc.vmpList.push(item) : acc.ksgList.push(item);
    return acc;
  }, { vmpList: [], ksgList: [] });
  const { ksgList, vmpList } = splitOmsData;
  const vmp = vmpList.map((item) => {
    item.C_T = item.C_T === '77' ? 'Москва' : 'Иногород';
    return item;
  });
  const { diab, hiv, hyper } = kslp;
  const ksg = ksgList.map((item) => {
    if (diab.map((item) => item.C_I).includes(item.C_I)) {
      item.PATOLOGY = 'E11';
    } else if (hyper.map((item) => item.C_I).includes(item.C_I)) {
      item.PATOLOGY = 'I27.0';
    } else if (hiv.map((item) => item.C_I).includes(item.C_I)) {
      item.PATOLOGY = 'I27.8';
    } else {
      item.PATOLOGY = '';
    }
    if (parseInt(item.C_I.slice(5)) >= 30000) {
      if (dayServList.includes(item.SRV_CODE)) {
        item.USL_OK = 2;
        item.C_T = item.C_T === '77' ? 'Москва' : 'Иногород';
        return item;
      }
      const interin = interinCodes.filter((i) => i.COD === item.SRV_CODE);
      item.SRV_CODE = interin.length > 0 ? interin[0].COD_USL : null;
      item.USL_OK = 2;
      item.C_T = item.C_T === '77' ? 'Москва' : 'Иногород';
      return item;
    }
    if (hospServList.includes(item.SRV_CODE)) {
      item.USL_OK = 1;
      item.C_T = item.C_T === '77' ? 'Москва' : 'Иногород';
      return item;
    }
    const interin = interinCodes.filter((i) => i.COD === item.SRV_CODE);
    item.SRV_CODE = interin.length > 0 ? interin[0].COD_USL : null;
    item.USL_OK = 1;
    item.C_T = item.C_T === '77' ? 'Москва' : 'Иногород';
    return item;
  }).filter((item) => item.DDS !== 'U07.1' && item.DDS !== 'U07.2' && item.DDS !== 'G90.9');
  return { vmp, ksg };
};
