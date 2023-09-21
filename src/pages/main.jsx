import React, { useState } from 'react'
import Modal from '../components/modal'
import { connect } from 'react-redux';
import { getContacts } from '../store/actions/contact'
import useModal from '../hooks/modalHook';

const Main = ({ getContacts }) => {

  const { modalTitle, btnColor, handleModal, closeModal } = useModal();
  const [countryId, setCountryId]=useState(0);

  const handleBtn=(countryId, modalName, btnColor )=>{
    getContacts(countryId)
    handleModal(modalName, btnColor)
    setCountryId(countryId)
  }

  return (
    <>
        <div style={{height:"500px"}} type="button"  className='d-flex justify-content-around align-items-center'>
            <button style={{backgroundColor:"#46139f"}} data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>handleBtn(0, "A", "#46139f")} className='btn btn-primary'> A </button>
            <button style={{backgroundColor:"#ff7f50"}} data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>handleBtn(226, "B", "#ff7f50")} className='btn btn-primary'> B </button>
        </div>
        <Modal modalTitle={ modalTitle } btnColor={btnColor} closeModal={closeModal} countryId={ countryId } setCountryId={ setCountryId }/>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getContacts: (countryId) => {
            dispatch(getContacts(1, null, countryId));
        }
       
    };
};

export default connect(null, mapDispatchToProps)(Main);