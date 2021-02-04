import interin from '../model/interin';

const interinController = async () => {
  const coll = await interin.find({});
  return coll;
};

export default interinController;
