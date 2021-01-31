import model from '../model';

const dataController = async (_req, reply) => {
  const { ds } = _req.query;
  const coll = await model.aggregate([
    { $match: { MKB_1: { $regex: `^${ds}`, $options: 'i' } } },
    {
      $lookup: {
        from: 'ksg_ratio',
        localField: 'KSG',
        foreignField: 'KSG',
        as: 'ratio',
      },
    },
    {
      $unwind: {
        path: '$ratio',
      },
    },
    {
      $set: { RATIO: '$ratio.K' },
    },
    {
      $project: {
        _id: 0, GROUP_NUM: 0, __v: 0, ratio: 0,
      },
    },
  ]);
  console.log(coll);
  reply.send(coll);
};

export default dataController;
