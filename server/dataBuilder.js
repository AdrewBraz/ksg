import { uniqBy, find } from 'lodash';
import { listDsController, listUslController } from '../controller';

const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});

const calculateKsg = (kz = 1, age, finalCode) => {
  const ks = kz >= 2 ? 1.4 : 0.8;
  const kslp = age > 75 ? 1.1 : 1;
  const sum = 56680.9 * 0.41 * ks * kz * kslp * 1.672;
  if (finalCode !== '0') {
    return (sum - sum * 0.2);
  }
  return sum;
};

export default async (data) => {
  const dsList = uniqBy(data, 'DDS');
  const usList = uniqBy(data, 'SRV_CODE');
  const filteredList = dsList.map((item) => item.DDS).filter((item) => item !== 'U07.1' && item !== 'U07.2');
  const filteredListUSl = usList.map((item) => item.SRV_CODE).filter((item) => !!item).map((item) => item.trim());
  const ds = await listDsController(filteredList);
  const usl = await listUslController(filteredListUSl);
  const getRatioByUsl = (cod, list) => {
    const item = find(list, { COD_USL: cod, MKB_1: '' })
      ? find(list, { COD_USL: cod, MKB_1: '' })
      : find(list, { COD_USL: cod, MKB_1: 'I.' });
    if (!item) {
      return 0;
    }
    const ratio = item.RATIO;
    const ksg = item.KSG;
    const ksgName = item.KSG_NAME;
    return { ratio, ksg, ksgName };
  };
  const getRatioByDs = (dds, list, cod = '') => {
    const item = find(list, { MKB_1: dds, COD_USL: cod });
    let ratio;
    if (item === undefined) {
      const { ratio, ksg, ksgName } = getRatioByUsl(cod, usl);
      return { ratio, ksg, ksgName };
    }
    if (item) {
      ratio = item.RATIO;
      const ksg = item.KSG;
      const ksgName = item.KSG_NAME;
      return { ratio, ksg, ksgName };
    }
  };
  const result = data.reduce((acc, item) => {
    const {
      C_I, DDS, FIO, AGE, FINAL_CODE,
    } = item;
    const cod = item.SRV_CODE ? item.SRV_CODE : '';
    const { ratio, ksg, ksgName } = getRatioByDs(DDS, ds, cod);
    if (acc[C_I]) {
      const { kz } = acc[C_I];
      if (kz >= ratio) {
        acc[C_I].kz = kz;
      } else {
        acc[C_I].kz = ratio;
        acc[C_I].ksg = ksg;
        acc[C_I].ksgName = ksgName;
        acc[C_I].total = calculateKsg(ratio, AGE, FINAL_CODE);
      }
    } else {
      acc[C_I] = {
        FIO, DDS, AGE, FINAL_CODE, COD: cod, kz: ratio, ksgName, ksg, total: calculateKsg(ratio, AGE, FINAL_CODE),
      };
    }
    return acc;
  }, {});
  return result;
};
