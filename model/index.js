import mongoose from 'mongoose';

mongoose.set('debug', true);
const { Schema } = mongoose;

const KsgSchema = new Schema({
  MKB_1: String,
  MAIN_DS: String,
  MKB_2: String,
  ADD_DS: String,
  MKB_3: String,
  COM_DS: String,
  COD_USL: String,
  USL_NAME: String,
  AGE: Number,
  SEX: Number,
  DURATION: Number,
  DIFF_CRITERIA: String,
  FRACTION: String,
  KSG: String,
  KSG_NAME: String,
  GROUP_NUM: Number,
});
KsgSchema.index({MKB_1:{type: [String], text: true}})
export default mongoose.model('KSG', KsgSchema, 'ksg');
