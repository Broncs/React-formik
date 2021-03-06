import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const initialValues = {
  name: '', // property  ''name'' of the input
  email: '',
  channel: '',
};
const onSubmit = (values) => {
  console.log(values);
};

const validate = (values) => {
  //values.name values.email values.channel
  //some conditions to formik work as intendent
  //first condition must return obj
  //second condition must return the same keys as the values
  //errors.name errors.email errors.channel
  //third condition the value should be the string indicating what the error message should be for that particulatty field
  //errors.name = 'this fields is required'
  let errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.channel) {
    errors.channel = 'Required';
  }

  return errors;
};

const validationSchema = yup.object({
  name: yup.string().required('Required'),
  email: yup.string().email('invalid email format').required('Required'),
  channel: yup.string().required('Required'),
});

const OldYoutubeForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validate,
  });

  // console.log('Form values', formik.values);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email} // the same name
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.touched.channel && formik.errors.channel && (
            <div className="error">{formik.errors.channel}</div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OldYoutubeForm;
