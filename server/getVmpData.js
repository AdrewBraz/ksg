import vmpController from '../controller/vmpController';

const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});

export default async (data) => {
  const vmpData = await vmpController();
  const result = data.reduce((acc, item) => {
    const {
      C_I, FIO, DDS, AGE, C_T, OUT_DATE,
    } = item;
    const obj = vmpData.find((el) => el.ID === (item.COD).toString());
    const { GROUP, PRICE, NAME } = obj;
    acc[C_I] = {
      FIO,
      C_I,
      DDS,
      AGE,
      NAME,
      GROUP,
      PRICE,
      C_T,
      out_date: OUT_DATE.slice(0, 10)
    };
    return acc;
  }, {});
  return result;
};
