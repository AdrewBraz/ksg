import model from '../model';

const dataController = async (_req, reply) => {
  const { ds } = _req.query;
  const coll = await model.aggregate([
    { $match: { MKB_1: { $regex: `^${ds}`, $options: 'i' } } },
    { $project: { _id: 0, GROUP_NUM: 0, __v: 0 } },
  ]);
  reply.send(coll);
};

export default dataController;
