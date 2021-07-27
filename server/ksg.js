import { uniqBy, find } from 'lodash';

const calculateKslp = (age, patology = null, days = 0) => {
  let kslp = 1;
  if (age > 75) {
    kslp = 1.1;
  }
  if (days > 30) {
    kslp = 1.4;
  }
  if (patology) {
    kslp = 1.8;
  }
  return kslp;
};

const abourtedRatio = (days) => {
  if (days <= 2) {
    return 0.3;
  }
  if (days >= 3 && days <= 5) {
    return 0.5;
  }
  return 0.8;
};

const calculateKsg = (kz = 0.1, age, finalCode = 0, patology, days, condition) => {
  const nfs = condition === 1 ? 56680.9 : 25617.30;
  const kbs = condition === 1 ? 0.41 : 0.52;
  const ks = kz >= 2 ? 1.4 : 0.8;
  const kslp = calculateKslp(age, patology, days);
  const sum = nfs * kbs * ks * kz * kslp * 1.672;
  if (finalCode !== '0') {
    const abourtedKoeff = abourtedRatio(days);
    return (sum * abourtedKoeff);
  }
  return sum;
};

const getRatioByUsl = (cod, list, days, type) => {
  const item = find(list, { COD_USL: cod, MKB_1: '' })
    ? find(list, { COD_USL: cod, MKB_1: '' })
    : find(list, { COD_USL: cod, MKB_1: 'I.' });
  if (!item) {
    return 0;
  }
  const ratio = item.RATIO;
  const ksg = item.KSG;
  const ksgName = item.KSG_NAME;
  const group = item.GROUP_NUM;
  if (group === 235 && days <= 3 && type === 1) {
    return {
      ratio, ksg, ksgName, group,
    };
  }
  if (group === 113 && days <= 1 && type === 2) {
    return {
      ratio, ksg, ksgName, group,
    };
  }
  if (group === 235 && days > 3) {
    return { ratio: 0 };
  }
  return {
    ratio, ksg, ksgName, group,
  };
};

const getRatio = (dds, list, cod = '', days, uslList, type) => {
  const item = find(list, { MKB_1: dds, COD_USL: cod });
  let ratio;
  if (item === undefined) {
    const {
      ratio, ksg, ksgName, group,
    } = getRatioByUsl(cod, uslList, days, type);
    return {
      ratio, ksg, ksgName, group,
    };
  }
  if (cod && days <= 3) {
    const {
      ratio, ksg, ksgName, group,
    } = getRatioByUsl(cod, uslList, days, type);
    return {
      ratio, ksg, ksgName, group,
    };
  }
  if (item) {
    ratio = item.RATIO;
    const ksg = item.KSG;
    const ksgName = item.KSG_NAME;
    const group = item.GROUP_NUM;
    if (group === 154) {
      return 0;
    }
    return {
      ratio, ksg, ksgName, group,
    };
  }
};

export { getRatio, calculateKsg, calculateKslp };
