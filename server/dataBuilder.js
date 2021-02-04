import { listDsController } from '../controller';
import { listUslController } from '../controller';
import { uniqBy, find } from 'lodash';

const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  });

const calculateKsg = (kz=1, ks=0.8, kslp=1, nfs=56680.9, kd=1.672, kbs=0.41) => formatter.format(kz * ks * kslp * nfs * kd * kbs)
const getRatioByDs = (dds, list, cod="") => {
  const item = find(list, {MKB_1: dds, COD_USL: cod}).RATIO
  console.log(item, dds, cod)
  return item;
}
const getRatioByUsl = (cod, list ) => {
    const item = find(list, { COD_USL: cod}).RATIO
    return item;
}

export default async (data) => {
  const dsList = uniqBy(data, 'DDS')
  const usList = uniqBy(data, 'SRV_CODE')
  const filteredList = dsList.map(item => item.DDS).filter(item => item !== 'U07.1' && item !== 'U07.2');
  const filteredListUSl = usList.map(item => item.SRV_CODE).filter(item => !!item ).map(item => item.trim());
  console.log(filteredListUSl)
  const ds = await listDsController(filteredList);
  const usl = await listUslController(filteredListUSl)
  const result = data.reduce((acc, item) => {
      const dds = item.DDS;
      const cod = item.SRV_CODE ? item.SRV_CODE : "" ;
      let kz;
      if(cod){
          kz = getRatioByUsl(cod, usl) > kz ? getRatioByUsl(cod, usl) : kz
          console.log(cod, kz, dds)
      } else{
        kz = getRatioByDs(dds, ds, cod)
      }
      return acc
  })
}