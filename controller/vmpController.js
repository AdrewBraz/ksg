import vmp from '../model/vmp';

const vmpController = async () => {
  const coll = await vmp.find({});
  console.log(coll);
  return coll;
};

export default vmpController;
