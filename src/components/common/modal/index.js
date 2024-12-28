import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import './modal.scss';



export function NormalModal(props) {
  const {
    isShow = false,
    toggle = () => {},
    children = '',
    title = ''
  } = props;

  return (
    <>
       <Modal show={isShow} onHide={toggle} className='app-modal modal-side modal-top-right'>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
         {children}
        </Modal.Body>
      
      </Modal>
    </>
  );
}
