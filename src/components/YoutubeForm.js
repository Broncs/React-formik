import { useState } from 'react';

import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import TextError from './TextError';

const initialValues = {
  name: '', // property  ''name'' of the input
  email: '',
  channel: '',
  comments: '',
  address: '',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};
const savedData = {
  name: 'jhonatan', // property  ''name'' of the input
  email: '',
  channel: '',
  comments: '',
  address: '',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};
const onSubmit = (values, onSubmitProps) => {
  setTimeout(() => {
    console.log(values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  }, 3000);
};

const validationSchema = yup.object({
  name: yup.string().required('Required'),
  email: yup.string().email('invalid email format').required('Required'),
  channel: yup.string().required('Required'),
  // comments: yup.string().required('Required!!!'), did it inline field level
});
const validateComments = (value) => {
  let error;
  if (!value) {
    error = 'Required...';
  }
  return error;
};

const YoutubeForm = () => {
  const [formData, setFormData] = useState(null);
  return (
    <Formik
      initialValues={formData || initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
      // validateOnChange={false}
      // validateOnBlur={false}
      validateOnMount
    >
      {(form) => {
        console.log(form);

        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field type="text" id="channel" name="channel" />
              <ErrorMessage name="channel" />
            </div>
            <div className="form-control">
              <label htmlFor="comments">Coments</label>
              <Field
                as="textarea"
                name="comments"
                id="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <Field name="address">
                {(props) => {
                  {
                    /* console.log(props); */
                  }
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.error && meta.touched && <div>{meta.error}</div>}
                    </div>
                  );
                }}
              </Field>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">facebook</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">twitter</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>
            <div className="form-control">
              <label htmlFor="primaryPh">Primary phone number</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            </div>
            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary phone number</label>
              <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label htmlFor="phNumbers">PhoneNumbers list</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;

                  return (
                    <div>
                      {phNumbers.map((item, index) => {
                        return (
                          <div key={index}>
                            <Field name={`phNumbers[${index}]`} />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}

                            <button type="button" onClick={() => push('')}>
                              +
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            {/* 
            <button
              type="button"
              onClick={() => {
                form.setFieldTouched('comments');
                form.validateField('comments');
              }}
            >
              validate comments
            </button>
            <button
              type="button"
              onClick={() => {
                form.validateForm();
                form.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  address: true,
                  comments: true,
                });
              }}
            >
              validate all form
            </button> */}

            <button type="button" onClick={() => setFormData(savedData)}>
              Load data
            </button>
            <button type="reset">reset</button>

            <button type="submit" disabled={!form.isValid || form.isSubmitting}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YoutubeForm;
