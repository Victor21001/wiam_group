import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalInfoForm = ({ data, updateData }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.phone) newErrors.phone = 'Телефон обязателен';
    if (!formData.firstName) newErrors.firstName = 'Имя обязательно';
    if (!formData.lastName) newErrors.lastName = 'Фамилия обязательна';
    if (!formData.gender) newErrors.gender = 'Пол обязателен';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      updateData(formData);
      navigate('/work-address');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Телефон</label>
        <input
          type="tel"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="0XXX XXX XXX"
        />
        {errors.phone && <div className="text-danger">{errors.phone}</div>}
      </div>
      <div className="form-group">
        <label>Имя</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && (
          <div className="text-danger">{errors.firstName}</div>
        )}
      </div>
      <div className="form-group">
        <label>Фамилия</label>
        <input
          type="text"
          className="form-control"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && (
          <div className="text-danger">{errors.lastName}</div>
        )}
      </div>
      <div className="form-group">
        <label>Пол</label>
        <select
          className="form-control"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Выберите</option>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
        {errors.gender && <div className="text-danger">{errors.gender}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Далее
      </button>
    </form>
  );
};

export default PersonalInfoForm;
