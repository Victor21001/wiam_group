// src/App.jsx

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalInfoForm from './components/PersonalInfoForm';
import WorkAddressForm from './components/WorkAddressForm';
import LoanDetailsForm from './components/LoanDetailsForm';
import ConfirmationModal from './components/ConfirmationModal';

const App = () => {
  const [formData, setFormData] = useState({
    phone: '',
    firstName: '',
    lastName: '',
    gender: '',
    workPlace: '',
    address: '',
    loanAmount: 200,
    loanTerm: 10,
  });
  const [showModal, setShowModal] = useState(false);

  const updateData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <Router>
      <div className="container mt-5">
        <h1>Заявка на займ</h1>
        <Routes>
          <Route
            path="/personal-info"
            element={
              <PersonalInfoForm data={formData} updateData={updateData} />
            }
          />
          <Route
            path="/work-address"
            element={
              <WorkAddressForm data={formData} updateData={updateData} />
            }
          />
          <Route
            path="/loan-details"
            element={
              <LoanDetailsForm
                data={formData}
                updateData={updateData}
                showModal={handleModalShow}
              />
            }
          />
          <Route path="*" element={<Navigate to="/personal-info" />} />
        </Routes>
        <ConfirmationModal
          show={showModal}
          handleClose={handleModalClose}
          data={formData}
        />
      </div>
    </Router>
  );
};

export default App;
