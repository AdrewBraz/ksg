import model from '../model';

const dsController = async (ds, reply) => {
  console.log(coll)
  const coll = await model.aggregate([
    {
      '$match': {
        '$or': [
          {
            'MAIN_DS': {
              '$regex': `(^|\\s)${ds}`, 
              '$options': 'i'
            }
          }, {
            'MKB_1': {
              '$regex': `^${ds}`, 
              '$options': 'i'
            }
          }
        ]
      }
    },
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
        _id: 0, __v: 0, ratio: 0,
      },
    },
  ]);
  console.log(coll)
  reply.send(coll);
};

const uslController = async (usl, reply) => {
  const coll = await model.aggregate([
    {
      '$match': {
        '$or': [
          {
            'COD_USL': {
              '$regex': `^${usl}`, 
              '$options': 'i'
            }
          }, {
            'USL_NAME': {
              '$regex': `(^|\\s)${usl}`, 
              '$options': 'i'
            }
          }
        ]
      }
    },
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
        _id: 0, __v: 0, ratio: 0,
      },
    },
  ]);
  console.log(coll)
  reply.send(coll);
};

const listDsController = async (list) => {
  const coll = await model.aggregate([
    {
      $match: {
        MKB_1: { $in: list },
        GROUP_NUM: { $in: [27, 76, 77, 78, 79, 80, 81, 82, 83, 84, 96, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257] },
      },
    },
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
        _id: 0, __v: 0, ratio: 0,
      },
    },
  ]);
  return coll;
};

const listUslController = async (list) => {
  const coll = await model.aggregate([
    {
      $match: {
        COD_USL: { $in: list },
        GROUP_NUM: { $in: [27, 76, 77, 78, 79, 80, 81, 82, 83, 96, 84, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257] },
      },
    },
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
        _id: 0, __v: 0, ratio: 0,
      },
    },
  ]);
  return coll;
};

const allUsl = async () => {
  const coll = await model.find({ GROUP_NUM: { $in: [27, 76, 77, 78, 79, 80, 81, 82, 83, 84, 96, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257] } }).distinct('COD_USL');
  return coll.filter((item) => !!item);
};

export {
  dsController, uslController, listDsController, listUslController, allUsl,
};
