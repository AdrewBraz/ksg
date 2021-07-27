export default async (data) => {
  const diab = data.filter((item) => /диабет/gi.test(item.DS));
  const hyper = data.filter((item) => /идиопатическая легочная гипертензия/gi.test(item.DS));
  const hiv = data.filter((item) => /I27.8 Легочная артериальная гипертензия, ассоциированная с ВИЧ-инфекцией/gi.test(item.DS));
  return { diab, hyper, hiv };
};
