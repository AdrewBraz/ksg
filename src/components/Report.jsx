import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faCode, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions';

const renderIcon = (icon) => <FontAwesomeIcon className="icon" icon={icon} />;

const getReport = async (path) => {
  const reqPath = path === 'dbf' ? '/dataMega' : `/data${path}`;
  try {
    await axios.get(reqPath).then(() => {
      handleUrl();
      return 'success';
    }).then(() => console.log('success'));
  } catch (e) {
    throw new Error('Something went wrong');
  }
};

const paths = {
  excel: {
    path: 'excel',
    text: 'Отчет за период ФФОМС',
    icon: faFileExcel,
  },
  xml: {
    path: 'xml',
    text: 'Выгрузка за период ФФОМС',
    icon: faCode,
  },
  dbf: {
    path: 'dbf',
    text: 'Выгрузка за период МГФОМС',
    icon: faDatabase,
  },
};

const renderButton = (path, text, icon) => (
  <div key={path} className="input-group-prepend">
    <button type="submit" onClick={() => { getReport(path); }} className=" btn btn-primary btn-sm">
      <p>
        {text}
        {' '}
        <span>{renderIcon(icon)}</span>
      </p>
    </button>
  </div>
);

const Calculate = () => {
  const dispatch = useDispatch();
  const handleUrl = () => {
    dispatch(actions.addUrl(true));
  };
  const { url } = useSelector(({ appState }) => appState);

  useEffect(() => {}, [url]);

  return (
    <>
      <div>
        <div className="input-group flex-row justify-content-around w-100">
          {Object.keys(paths).map((item) => {
            const { path, text, icon } = paths[item];
            console.log(text);
            return renderButton(path, text, icon);
          })}
        </div>
      </div>
    </>
  );
};

export default Calculate;
