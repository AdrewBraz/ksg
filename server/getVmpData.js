import vmpController from '../controller/vmpController';

const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});

export default async (data) => {
  const vmpData = await vmpController();
  const result = data.reduce((acc, item) => {
    const { C_I, FIO, DDS, AGE } = item;
      const obj = vmpData.find((el) => el.ID === (item.COD).toString());
      const { GROUP, PRICE, NAME } = obj;
      acc[C_I] = {
        FIO,
        DDS,
        AGE,
        NAME,
        GROUP,
        PRICE
      };
    return acc;
  }, {});
  return result;
};
