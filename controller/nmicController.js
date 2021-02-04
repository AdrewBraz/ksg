import nmic from '../model/nmic';

const nmicController = async () => {
  const coll = await nmic.find({});
  return coll;
};

export default nmicController;
