import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";

const ReviewDelete = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    
    useImperativeHandle(ref, () => ({
        showDeleteModal() {
            setShow(true);
        },
    }));

    const deleteReview = () => {
        props.onConfirmed();
        setShow(false);
    };

    return(
        <Modal show={show}>
            <div className="modal-header">
                <h5 className="modal-title">확인</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                <div className="modal-body">삭제하시겠습니까?</div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
                        취소
                    </button>
                    <button type="button" className="btn btn-danger" onClick={deleteReview}>
                        삭제확인
                    </button>
                </div>
            </div>
        </Modal>
    );
});
export default ReviewDelete;