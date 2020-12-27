import mongoose from 'mongoose';
import model from '../model';

const dataController = async (_req, reply) => {
  const { ds } = _req.query;
  const coll = await model.aggregate([
    { $match: { MKB_1: { $regex: `^${ds}`, $options: 'i' } } },
  ]);
  console.log(coll.length);
  reply.send(coll);
};

export default dataController;
