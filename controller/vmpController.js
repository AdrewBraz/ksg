import vmp from '../model/vmp';

const vmpController = async () => {
  const coll = await vmp.find({});
  return coll;
};

export default vmpController;
