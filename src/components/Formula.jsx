import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Formula = () => {
  const inputStyle = {
    boxShadow: '1px 5px 5px -5px black',
    border: 'none',
    textAlign: 'center',
  };
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  });
  const {
    kz, ks, kslp, nfs, kd, kbs, item,
  } = useSelector(({ ksgState }) => ksgState);
  return (
    <>
      <div className="input-group flex-row w-100 mb-3">
        <div className="form-group d-flex flex-column text-center col-md-2">
          <label htmlFor="Sum">НФЗ</label>
          <input style={inputStyle} readOnly id="Sum" name="sum" type="text" value={`${formatter.format(nfs)}`} />
        </div>
        <div className="form-group d-flex flex-column text-center col-md-2">
          <label htmlFor="kbs">КБС</label>
          <input style={inputStyle} readOnly id="kbs" name="kbs" type="text" value={kbs} />
        </div>
        <div className="form-group text-center d-flex flex-column col-md-2">
          <label htmlFor="kz">КЗ</label>
          <input style={inputStyle} readOnly id="kz" name="kz" type="text" value={kz} />
        </div>
        <div className="form-group d-flex flex-column text-center col-md-2">
          <label htmlFor="ks">КС</label>
          <input style={inputStyle} readOnly id="ks" name="ks" type="text" value={ks} />
        </div>
        <div className="form-group d-flex flex-column text-center col-md-2">
          <label htmlFor="kd">КД</label>
          <input style={inputStyle} readOnly id="kd" name="kd" type="text" value={kd} />
        </div>
        <div className="form-group d-flex flex-column text-center col-md-2">
          <label htmlFor="kslp">КСЛП</label>
          <input style={inputStyle} readOnly id="kslp" name="kslp" type="text" value={kslp} />
        </div>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <h1 className="mt-5">
          Сумма по КСГ -
          {formatter.format(kz * ks * kslp * nfs * kd * kbs)}
        </h1>
        {Object.keys(item).length > 0 ? (
          <>
            <h2 className="mt-5">
              {item.KSG}
              -
              {item.KSG_NAME}
            </h2>
            <h2>
              Группа заболевания
              {item.GROUP_NUM}
            </h2>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Formula;
