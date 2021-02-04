import mongoose from 'mongoose';

mongoose.set('debug', true);
const { Schema } = mongoose;

const interinSchema = new Schema({
  COD_USL: String,
  USL_NAME: String
});

export default mongoose.model('Nmic', interinSchema, 'nmic');