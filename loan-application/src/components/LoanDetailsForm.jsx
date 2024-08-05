import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoanDetailsForm = ({ data, updateData, showModal }) => {
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
    if (!formData.loanAmount) newErrors.loanAmount = 'Сумма займа обязательна';
    if (!formData.loanTerm) newErrors.loanTerm = 'Срок займа обязателен';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      updateData(formData);
      try {
        const response = await axios.post(
          'https://dummyjson.com/products/add',
          {
            title: `${data.firstName} ${data.lastName}`,
          }
        );
        console.log('Response from server:', response.data);
        showModal();
      } catch (error) {
        console.error('Ошибка при отправке данных', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Сумма займа</label>
        <input
          type="range"
          className="form-control-range"
          name="loanAmount"
          min="200"
          max="1000"
          step="100"
          value={formData.loanAmount}
          onChange={handleChange}
        />
        <div>${formData.loanAmount}</div>
        {errors.loanAmount && (
          <div className="text-danger">{errors.loanAmount}</div>
        )}
      </div>
      <div className="form-group">
        <label>Срок займа (дней)</label>
        <input
          type="range"
          className="form-control-range"
          name="loanTerm"
          min="10"
          max="30"
          step="1"
          value={formData.loanTerm}
          onChange={handleChange}
        />
        <div>{formData.loanTerm} дней</div>
        {errors.loanTerm && (
          <div className="text-danger">{errors.loanTerm}</div>
        )}
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/work-address')}
        >
          Назад
        </button>
        <button type="submit" className="btn btn-success">
          Подать заявку
        </button>
      </div>
    </form>
  );
};

export default LoanDetailsForm;
