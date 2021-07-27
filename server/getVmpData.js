import vmpController from '../controller/vmpController';
import { getRslt, getIshod, utf8_decode } from './xml/utils';

const vHmp = [{
  GROUP: 42, VID_HMP: 183, METOD_HMP: 44, MODEL_HMP: 21168,
}, {
  GROUP: 36, VID_HMP: 183, METOD_HMP: 47, MODEL_HMP: 21166,
}, {
  GROUP: 37, VID_HMP: 183, METOD_HMP: 46, MODEL_HMP: 21166,
}, {
  GROUP: 38, VID_HMP: 183, METOD_HMP: 45, MODEL_HMP: 21166,
}, {
  GROUP: 39, VID_HMP: 183, METOD_HMP: 47, MODEL_HMP: 21167,
}, {
  GROUP: 40, VID_HMP: 183, METOD_HMP: 46, MODEL_HMP: 21167,
}, {
  GROUP: 41, VID_HMP: 183, METOD_HMP: 45, MODEL_HMP: 21167,
}, {
  GROUP: 43, VID_HMP: 220, METOD_HMP: 1103, MODEL_HMP: 21169,
}, {
  GROUP: 45, VID_HMP: 219, METOD_HMP: 1102, MODEL_HMP: 21170,
}, {
  GROUP: 46, VID_HMP: 184, METOD_HMP: 1072, MODEL_HMP: 21171,
}];

export default async (data) => {
  const vmpData = await vmpController();
  const result = data.reduce((acc, item) => {
    const {
      PATIENT, FIO, C_T, C_I, DR, W, S_POL, SN_POL, ORG_CODE, ORG, DDS, AGE, IN_DATE, OUT_DATE, TAL_D, TAL_NUM, FINAL_CODE, ID,
    } = item;
    const obj = vmpData.find((el) => el.ID === (item.COD).toString());
    const { GROUP, PRICE, NAME } = obj;
    const hmp = vHmp.find((el) => el.GROUP === GROUP);
    let SNPOLIS; let
      ENP;
    if (S_POL || SN_POL.length !== 16) {
      if (!S_POL) {
        SNPOLIS = `${SN_POL}`;
      } else {
        SNPOLIS = `${S_POL} ${SN_POL}`;
      }
    } else {
      ENP = SN_POL;
    }
    const { VID_HMP, METOD_HMP, MODEL_HMP } = hmp;
    const RSLT = getRslt(FINAL_CODE);
    const ISHOD = getIshod(RSLT);
    acc[C_I] = {
      IDNPR: `${PATIENT}_${ID}`,
      SNPOLIS,
      DR,
      W,
      ENP,
      AGE,
      TAL_D,
      TAL_NUM,
      POVOD: 3,
      C_I,
      DS1: DDS,
      USL_OK: 1,
      VIDPOM: 32,
      FOR_POM: 3,
      PROFIL: 81,
      GR_HMP: GROUP,
      VID_HMP,
      METOD_HMP,
      MODEL_HMP,
      RESH_HMP: 1,
      PODR: ORG_CODE,
      PODR_NAME: ORG,
      IDCASE: `${PATIENT}_${C_I}`,
      ADR_GAR: '271c73e1-90f9-496f-a023-4c9f02800af2',
      ADR_NAME: utf8_decode('121552, г. Москва, город Москва, УЛИЦА ЧЕРЕПКОВСКАЯ 3-Я, ДОМ 15А'),
      DATE_Z_1: IN_DATE,
      DATE_Z_2: OUT_DATE,
      KD_Z: Math.ceil(parseInt((OUT_DATE.getTime() - IN_DATE.getTime()) / (24 * 3600 * 1000))),
      RSLT,
      ISHOD,
      IS_PRERV: 0,
      FIO,
      PRICE,
      NAME,
      C_T,
    };
    return acc;
  }, {});
  return result;
};
