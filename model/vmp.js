import mongoose from 'mongoose';

mongoose.set('debug', true);
const { Schema } = mongoose;

const vmpSchema = new Schema({
  ID: String,
  NAME: String,
  NFS: Number,
  GROUP: Number,
  PRICE: Number,
});

export default mongoose.model('VMP', vmpSchema, 'vmp');
