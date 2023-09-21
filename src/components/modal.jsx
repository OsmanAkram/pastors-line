import React, { useRef, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { getContacts, getSearchContacts } from '../store/actions/contact'
import { ISCHECKED } from '../store/actions/contactTypes';
import ScrollBar from './scrollBar';


const Modal = (props) => {
    const { modalTitle, btnColor, closeModal, getContacts, getSearchContacts, isChecked, countryId, setCountryId } = props;
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const [detail, setDetail] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

    useEffect(() => {
        const modalElement = modalRef.current;

        window.$(modalElement).on('hidden.bs.modal', function () {
            closeModal()
        });

        return () => {
            window.$(modalElement).off('hidden.bs.modal');
        };
    }, []);

    const handleGetContact = (countryId) => {
        getContacts(1, countryId);
        setCountryId(countryId);
    }

    const handleCheckboxChange = (event) => {
        dispatch(
            {
                type: ISCHECKED,
                payload: event.target.checked
            }
        )
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const newTypingTimeout = setTimeout(() => {
            if (value.trim() !== '') {
                getSearchContacts(value)
            }
        }, 600);

        setTypingTimeout(newTypingTimeout);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (searchTerm.trim() !== '') {
                getSearchContacts(searchTerm)
            }
        }
    };

    return (
        <div >
            <div ref={modalRef} className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal {modalTitle}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                            className='mx-4 my-2'
                        />
                        <div className="modal-body">
                            <div className='d-flex justify-content-between align-items-center mb-4'>
                                <button onClick={() => handleGetContact(0)} style={modalTitle == "A" ? { backgroundColor: btnColor } : {}} type="button" className="btn btn-primary">All Contacts</button>
                                <button onClick={() => handleGetContact(226)} style={modalTitle == "B" ? { backgroundColor: btnColor } : {}} type="button" className="btn btn-primary">US Contacts</button>
                                <button style={{ backgroundColor: "white", border: "2px solid #46139f" }} type="button" className="btn" data-dismiss="modal">Close</button>
                            </div>
                            <ScrollBar setDetail={setDetail} countryId={countryId} />

                        </div>
                        <div className="align-self-start ml-4">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                /> Only even
                            </label>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal C</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Country Id: {detail}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        isChecked: state?.contacts?.isChecked,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getContacts: (page, countryId) => {
            dispatch(getContacts(page, null, countryId));
        },
        getSearchContacts: (query) => {
            dispatch(getSearchContacts(query));
        },


    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Modal);