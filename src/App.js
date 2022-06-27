import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const initialValues = {
    name: '',
    email: '',
    tel: '',
    date: '',
    message: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setFormValues({ ...formValues, name: value.toUpperCase() });
    } else setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setFormErrors(validate(formValues));
    await setIsSubmit(true);
  };

  const handleFocusMessage = (e) => {
    setFormErrors(validate(formValues));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post('https://jsonplaceholder.typicode.com/posts').then((res) => {
        if (res.status == 200 || res.status == 201) {
          console.log('SUCCESS');
        } else console.log('SOMETHING WENT WRONG');
      });
      setFormValues(initialValues);
      setIsSubmit(false);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regexName = /[A-ZА-Я]{3,30}\s[A-ZА-Я]{3,30}/i;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexTel = /^((\+7|7|8)\s+([0-9]){3}\s+([0-9]){7})$/i;
    if (!values.name) {
      errors.name = 'Имя и фамилия обязательны!';
    } else if (!regexName.test(values.name)) {
      errors.name = 'Имя и фамилия должны быть введены через пробел';
    }
    if (!values.email) {
      errors.email = 'Почта обязательна!';
    } else if (!regexEmail.test(values.email)) {
      errors.email = 'Введите почту в формате "email@email.com"';
    }
    if (!values.tel) {
      errors.tel = 'Номер телефона обязателен!';
    } else if (!regexTel.test(values.tel)) {
      errors.tel = 'Введите номер телефона согласно формату +7 000 0000000';
    }
    if (!values.date) {
      errors.date = 'Дата рождения обязательна!';
    }
    if (!values.message) {
      errors.message = 'Поле сообщения не заполнено!';
    } else if (values.message.length < 10) {
      errors.message = 'Минимальное количество символов 10';
    } else if (values.message.length > 300) {
      errors.message = 'Максимальное количество символов 300';
    }

    return errors;
  };

  return (
    <div className="container">
      <form className="container__form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name Surname</label>
          <input
            type="text"
            name="name"
            placeholder="NAME SURNAME"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <p className="errors">{formErrors.name}</p>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            placeholder="mail@mail.com"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <p className="errors">{formErrors.email}</p>

        <div className="form-control">
          <label htmlFor="tel">Tel.</label>
          <input
            type="tel"
            name="tel"
            placeholder="+7 999 999-99-99"
            value={formValues.tel}
            onChange={handleChange}
          />
        </div>
        <p className="errors">{formErrors.tel}</p>

        <div className="form-control">
          <label htmlFor="birth">Date of birth</label>
          <input type="date" name="date" value={formValues.date} onChange={handleChange} />
        </div>

        <textarea
          placeholder="Please, enter your message..."
          maxLength="300"
          name="message"
          value={formValues.message}
          onChange={handleChange}
        />
        <p className="errors">{formErrors.message}</p>

        <button className="button__submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
