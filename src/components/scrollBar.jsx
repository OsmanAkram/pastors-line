import React, { useState, useEffect, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect, useDispatch } from 'react-redux';
import { getContacts } from '../store/actions/contact'


function ScrollBar(props) {
  const { setDetail, getContacts, contacts, searchContacts, countryId}=props;  
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollbarsRef = useRef(null);
  const [page, setPage] = useState(1);


  const isScrollbarAtBottom = () => {
    const scrollbar = scrollbarsRef.current;
    if (!scrollbar) return false;

    const scrollTop = scrollbar.getScrollTop();
    const scrollHeight = scrollbar.getScrollHeight();
    const clientHeight = scrollbar.getClientHeight();

    const threshold = 10;

    return scrollHeight - scrollTop <= clientHeight + threshold;
  };

  const handleScroll = () => {
    const isBottom = isScrollbarAtBottom();
    if (isBottom) {
      const nextPage = page + 1;
      getContacts(nextPage, setPage, countryId)
    }
    setScrollPosition(scrollbarsRef.current.getScrollTop());
  };

  useEffect(()=>{
    // console.log("data-contacts-------",contacts)
  },[contacts])

  return (
    <div>
      <Scrollbars
        autoHeight
        autoHeightMax={300}
        ref={scrollbarsRef}
        style={{ width: '100%', height: '300px' }}
        onScroll={handleScroll} // Use onScroll prop
      >
        {searchContacts.length > 0 ?
            Object.keys(searchContacts).map((contact,index)=>
                <div
                onClick={() => setDetail(contacts[contact].country?.id)}
                className="card mb-2"
                key={index}
                data-toggle="modal"
                data-target="#exampleModalLong"
                >
                <div className="card-body">
                    <p className="card-text">User ID: {contacts[contact].id}</p>
                    <p className="card-text">Country: {contacts[contact].country?.id}</p>
                </div>
                </div>
                )
            :
            Object.keys(contacts).map((contact,index)=>
                <div
                onClick={() => setDetail(contacts[contact].country?.id)}
                className="card mb-2"
                key={index}
                data-toggle="modal"
                data-target="#exampleModalLong"
                >
                <div className="card-body">
                    <p className="card-text">User ID: {contacts[contact].id}</p>
                    <p className="card-text">Country: {contacts[contact].country?.id}</p>
                </div>
                </div>
            )
        }
      </Scrollbars>
    </div>
  );
}

const mapStateToProps=(state)=>{
    return {
        contacts: state?.contacts?.filterContacts,
        searchContacts: state?.contacts?.searchContacts,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getContacts: (page,setPage, countryId) => {
            dispatch(getContacts(page, setPage, countryId, true));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScrollBar);

