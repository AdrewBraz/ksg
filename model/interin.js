import mongoose from 'mongoose';

mongoose.set('debug', true);
const { Schema } = mongoose;

const interinSchema = new Schema({
  SRV_NAME: String,
  COD: String,
  COD_USL: String,
});

export default mongoose.model('Interin', interinSchema, 'interin');
