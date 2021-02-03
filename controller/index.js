import model from '../model';

const dsController = async (_req, reply) => {
  const { ds } = _req.query;
  const coll = await model.aggregate([
    { $match: { MKB_1: { $regex: `^${ds}`, $options: 'i' }, GROUP_NUM: { $in: [27, 76, 77, 78, 79, 80, 81, 82, 83, 84, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257] } } },
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
  reply.send(coll);
};

const uslController = async (_req, reply) => {
  const { usl } = _req.query;
  const coll = await model.aggregate([
    { $match: { COD_USL: { $regex: `^${usl}`, $options: 'i' }, GROUP_NUM: { $in: [27, 76, 77, 78, 79, 80, 81, 82, 83, 84, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257] } } },
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
  reply.send(coll);
};

export { dsController, uslController };
