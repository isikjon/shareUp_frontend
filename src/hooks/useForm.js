import { useState } from 'react';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    callback(values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const setFieldError = (field, error) => {
    setErrors({
      ...errors,
      [field]: error,
    });
  };

  const setFormErrors = (newErrors) => {
    setErrors(newErrors);
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
    setValues,
    setFieldError,
    setFormErrors,
  };
};

