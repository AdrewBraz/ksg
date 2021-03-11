import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import actions from '../actions';
import { useDispatch, useSelector } from 'react-redux';

const Calculate = () => {
  const dispatch = useDispatch();
  const handleUrl = () => {
    dispatch(actions.addUrl(true))
  }
  const { url } = useSelector(({ appState }) => appState);

  useEffect(() => {}, [url])

  const generateOnSubmit = () => async (values) => {
    const { excel } = values;
    const formdata = new FormData();
    formdata.append('excel', excel);
    console.log(formdata);
    try {
      await axios.post('/report', formdata).then(() => {
        handleUrl();
        return 'success'
      }).then(() => console.log('success'));
    } catch (e) {
      throw new Error('Something went wrong');
    }
  };

  const form = useFormik({
    onSubmit: generateOnSubmit(),
    initialValues: {},
    validateOnBlur: false,
  });

  return (
    <>
      <form action="/calculate" encType="multipart/form-data" method="post" className="form-inline mb-3" onSubmit={form.handleSubmit}>
        <div className="input-group flex-row w-100">
          <input type="file" name="excel" placeholder="file" onChange={({ currentTarget }) => { form.setFieldValue('excel', currentTarget.files[0]); }} className="custom-file-input col-10" />
          <label className="custom-file-label col-10" htmlFor="customFile">Choose file</label>
          <div className="input-group-prepend">
            <button type="submit" disabled={form.isValidating || form.isSubmitting} className=" btn btn-primary btn-sm">
              {form.isSubmitting ? <Spinner animation="border" /> : 'Добавить файл'}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-5 d-flex justify-content-center">
        { url ? <a download href="/download" className="btn excel  btn-success" role="button">
          <FontAwesomeIcon  className=" w-100 h-100" icon={faFileExcel} />
        </a> : null }
      </div>
    </>
  );
};

export default Calculate;
