import model from '../model/ds';

const dsController = async (ds, reply) => {
  const coll = await model.aggregate([
    { $match: { MKB_1: { $regex: `^${ds}`, $options: 'i' }, GROUP_NUM: { $in: [34,35,36, 113, 114, 115, 117] } } },
    {
      $lookup: {
        from: 'ksgDs_ratio',
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

const uslController = async (usl, reply) => {
  const patternMatch = usl.match(/(A\d{2}(\.)?[0-9\.]*)/gi)
  let regexObj;
  if(patternMatch){
    regexObj = { COD_USL: { $regex: `^${usl}`, $options: 'i' }}
  } else {
    const regex = new RegExp(/\b[А-Яа-я]?/)
    regexObj = { USL_NAME: { $regex: `$${usl}`, $options: 'ig' }}
  }
  const coll = await model.aggregate([
    { $match: { ...regexObj, GROUP_NUM: { $in: [34,35,36, 113, 114, 115, 117] } } },
    {
      $lookup: {
        from: 'ksgDs_ratio',
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

const listDsController = async (list) => {
  const coll = await model.aggregate([
    { $match: { 
        MKB_1: { $in: list },
        GROUP_NUM: { $in: [34,35,36, 113, 114, 115, 117] } } 
    },
    {
      $lookup: {
        from: 'ksgDs_ratio',
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
  return coll;
};

const listUslController = async (list) => {
  console.log(list)
  const coll = await model.aggregate([
    { $match: { 
        COD_USL: { $in: list },
        GROUP_NUM: { $in: [34,35,36, 113, 114, 115, 117] } } 
    },
    {
      $lookup: {
        from: 'ksgDs_ratio',
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
  return coll;
};

export { dsController, uslController, listDsController, listUslController };
