import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import actions from '../actions';

const Calculate = () => {
  const generateOnSubmit = () => async (values) => {
    const { excel } = values;
    const formdata = new FormData();
    formdata.append('excel', excel);
    console.log(formdata);
    try {
      await axios.post('/calculate', formdata).then(() => console.log('success'));
    } catch (e) {
      throw new Error('Something went wrong');
    }
    dispatch(actions.modalStateClose());
  };

  const form = useFormik({
    onSubmit: generateOnSubmit(),
    initialValues: {},
    validateOnBlur: false,
  });

  return (
    <form action="/calculate" encType="multipart/form-data" method="post" className="form-inline mb-3" onSubmit={form.handleSubmit}>
      <div className="input-group flex-row w-100">
        <input type="file" name="excel" placeholder="file" onChange={({ currentTarget }) => { form.setFieldValue('excel', currentTarget.files[0]); }} className="form-control" />
        <div className="input-group-prepend">
          <button type="submit" disabled={form.isValidating || form.isSubmitting} className=" btn btn-primary btn-sm">
            {form.isSubmitting ? <Spinner animation="border" /> : 'Добавить файл'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Calculate;
