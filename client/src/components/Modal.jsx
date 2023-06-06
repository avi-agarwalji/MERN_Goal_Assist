const Modal = ({ handleModal, children }) => {
  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <button className="modal__btn btn" onClick={handleModal}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
