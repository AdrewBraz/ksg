import vmpController from '../controller/vmpController';

const vmpCodes = [200409, 200510, 200518, 200519, 200520, 200524, 200522, 200523, 200524, 200525, 200530];

export default async (data) => {
  const vmpData = await vmpController();
  const filteredData = data.filter((item) => vmpCodes.includes(item.COD));
  console.log(filteredData);
  const result = filteredData.reduce((acc, item) => {
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
  console.log(result);
};
