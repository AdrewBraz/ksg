import vmpController from '../controller/vmpController';

const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});

export default async (data) => {
  const vmpData = await vmpController();
  const result = data.reduce((acc, item) => {
    if (acc.hasOwnProperty(item.COD)) {
      acc[item.COD].count = acc[item.COD].count + 1;
      acc[item.COD].TOTAL = acc[item.COD].PRICE * acc[item.COD].count.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
    } else {
      const obj = vmpData.find((el) => el.ID === (item.COD).toString());
      const { GROUP, PRICE, NAME } = obj;
      acc[item.COD] = {
        NAME,
        GROUP,
        PRICE,
        count: 1,
      };
      acc[item.COD].TOTAL = acc[item.COD].PRICE.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
    }

    return acc;
  }, {});
  return result;
};
