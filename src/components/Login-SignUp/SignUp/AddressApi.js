import React, {
  useState,
  Fragment,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import './AddressApi.scss';

const AddressApi = ({
  changeAddress,
  address,
  detailAddress,
  userData,
  setNonRequiredData,
  nonRequiredData,
  setUserData,
}) => {
  /* 모달 설정 */
  const AddressModalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: '75%',
      bottom: '50%',
      marginBottom: '-50%',
      marginRight: '-60%',
      transform: 'translate(-50%, -50%)',
      overflow: 'hidden',
      WebkitOverflowScrolling: 'touch',
      preventScroll: 'true',
    },
    overlay: { zIndex: 9999 },
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    signUpAddressRef.current.focus();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  /* 모달 설정 끝 */

  /* 주소입력 */

  const [addressContents, setAddressContents] = useState();
  const signUpAddressRef = useRef();

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddressContents(data.zonecode + ', ' + fullAddress);
    changeAddress(data.zonecode + ', ' + fullAddress);
    closeModal();
  };

  const postCodeStyle = {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: '3px',
  };
  /* 주소입력 끝 */

  /* 수정창에서 받아온 주소, 상세주소 */

  const changeValue = useCallback(
    (e) => {
      setNonRequiredData({
        ...nonRequiredData,
        [e.target.name]: e.target.value,
      });
    },
    [nonRequiredData, setNonRequiredData]
  );

  const onChange = useCallback(
    (e) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    },
    [userData, setUserData]
  );

  const onClick = useCallback((e) => {
    e.target.value = '';
  }, []);

  useEffect(() => {
    if (address !== undefined && detailAddress !== undefined) {
      setAddressContents(address);
    }
  }, [setAddressContents, address, detailAddress]);

  return (
    <Fragment>
      <div className='signUpAddressBox'>
        <div className='labelWrapper'>
          <label htmlFor='address'>주소</label>
        </div>
        <input
          className='signUpAddress'
          name='address'
          type='text'
          placeholder='클릭해서 주소를 입력해주세요.'
          autoComplete='off'
          readOnly
          value={addressContents}
          onClick={openModal}
        />
        <div className='labelWrapper'>
          <label htmlFor='address'>상세 주소</label>
        </div>
        <input
          className='signUpDetailAddress'
          name='detailAddress'
          type='text'
          placeholder='상세 주소를 입력해주세요.'
          autoComplete='off'
          ref={signUpAddressRef}
          value={detailAddress}
          onClick={onClick}
          onChange={
            userData !== '' && userData !== undefined ? onChange : changeValue
          }
          maxLength='30'
        />
        <Modal
          isOpen={modalIsOpen}
          closeTimeoutMS={200}
          onRequestClose={closeModal}
          style={AddressModalCustomStyles}
          contentLabel='AddressModal'
        >
          <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
        </Modal>
      </div>
    </Fragment>
  );
};

export default AddressApi;
