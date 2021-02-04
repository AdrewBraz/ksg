import vmpController from '../controller/vmpController';

export default async (data) => {
  const vmpData = await vmpController();
  const result = data.reduce((acc, item) => {
    if (acc.hasOwnProperty(item.COD)) {
      acc[item.COD].count = acc[item.COD].count + 1;
    } else {
      const obj = vmpData.find((el) => el.ID === (item.COD).toString());
      const { GROUP, PRICE, NAME } = obj;
      acc[item.COD] = {
        NAME,
        GROUP,
        PRICE,
        count: 1,
      };
    }
    return acc;
  }, {});
  return result
};
