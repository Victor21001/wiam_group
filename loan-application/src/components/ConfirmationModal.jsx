import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ show, handleClose, data }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Поздравляем!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Поздравляем, {data.lastName} {data.firstName}. Вам одобрена{' '}
        {data.loanAmount} на {data.loanTerm} дней.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
