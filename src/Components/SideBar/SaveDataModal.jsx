import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SaveDataModal = ({showSaveDataModal , setShowSaveDataModal , handleSaveCourse}) => {
    
    function handleCloseSaveDataModal(){
        setShowSaveDataModal(false);
    }


    return ( <>
        <Modal show={showSaveDataModal} onHide={handleCloseSaveDataModal}>
        <Modal.Header closeButton>
          <Modal.Title>Save Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Save Changes first</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSaveDataModal}>
            Ok
          </Button>
          {/* we will save changes , then redirect ? to that new sem? */}
          <Button variant="primary" onClick={()=>{handleCloseSaveDataModal();handleSaveCourse()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </> );
}
 
export default SaveDataModal;