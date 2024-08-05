import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WorkAddressForm = ({ data, updateData }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://dummyjson.com/products/categories'
        );
        setCategories(response.data); // Устанавливаем категории из API
      } catch (error) {
        console.error('Ошибка при загрузке категорий', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.workPlace) newErrors.workPlace = 'Место работы обязательно';
    if (!formData.address) newErrors.address = 'Адрес обязателен';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      updateData(formData);
      navigate('/loan-details');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Место работы</label>
        <select
          className="form-control"
          name="workPlace"
          value={formData.workPlace}
          onChange={handleChange}
        >
          <option value="">Выберите</option>
          {categories.map((category, index) => (
            <option key={index} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.workPlace && (
          <div className="text-danger">{errors.workPlace}</div>
        )}
      </div>
      <div className="form-group">
        <label>Адрес проживания</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <div className="text-danger">{errors.address}</div>}
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/personal-info')}
        >
          Назад
        </button>
        <button type="submit" className="btn btn-primary">
          Далее
        </button>
      </div>
    </form>
  );
};

export default WorkAddressForm;
