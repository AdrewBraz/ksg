const getRslt = (code, usl_ok = 1) => {
  const types = {
    V: '101',
    3: '102',
    0: '101',
    5: '105',
    9: '108',
    null: '101',
    1: '107',
    7: '101',
  };

  const dsTypes = {
    3: '202',
    0: '201',
    5: '205',
    9: '208',
    null: '201',
    1: '207',
    7: '201',
  };

  return usl_ok === 1 ? types[code] : dsTypes[code];
};

const getIshod = (rslt) => {
  const types = {
    101: '102',
    102: '103',
    105: '104',
    108: '102',
    107: '102',
    201: '202',
    202: '203',
    205: '204',
    208: '202',
    207: '202',
  };
  return types[rslt];
};

const getPrev = (final, days, group = '') => {
  if (final === '108') {
    return 1;
  }
  if (final === '208') {
    return 1;
  }
  if (group === 235) {
    return 0;
  }
  if (days <= 3) {
    return 1;
  }
  return 0;
};

const getProfil = (group) => {
  if ([232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243].includes(group) === true) {
    return 81;
  } if ([76, 77, 78, 79, 80, 81, 82, 83, 84, 35, 36].includes(group) === true) {
    return 29;
  } if ([249, 250, 251, 252, 253].includes(group)) {
    return 97;
  }
  return 77;
};

const utf8_decode = (aa) => {
  let bb = ''; let
    c = 0;
  for (let i = 0; i < aa.length; i++) {
    c = aa.charCodeAt(i);
    if (c > 127) {
      if (c > 1024) {
        if (c == 1025) {
          c = 1016;
        } else if (c == 1105) {
          c = 1032;
        }
        bb += String.fromCharCode(c - 848);
      }
    } else {
      bb += aa.charAt(i);
    }
  }
  return bb;
};

export {
  getRslt, getIshod, getProfil, utf8_decode, getPrev,
};
