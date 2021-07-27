import fs from 'fs';
import util from 'util';
import iconv from 'iconv-lite';

const writeFile = util.promisify(fs.writeFile);

export default async (xml, date) => {
  await writeFile(`${__dirname}/file.xml`, xml);
  return new Promise((resolve) => {
    const write = fs.createWriteStream(`C:/Users/User/Desktop/Выгрузка ФФОМС/FM990089F00${date}.xml`);
    fs.createReadStream(`${__dirname}/file.xml`)
      .pipe(iconv.decodeStream('utf8'))
      .pipe(iconv.encodeStream('win1251'))
      .pipe(fs.createWriteStream(`C:/Users/User/Desktop/Выгрузка ФФОМС/FM990089F00${date}.xml`));
    write.on('finish', resolve);
  });
};
