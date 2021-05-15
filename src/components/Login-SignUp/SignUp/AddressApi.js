import React, { useCallback } from 'react';
import DaumPostcode from 'react-daum-postcode';
import './AddressApi.scss'

const AddressApi = () => {

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if(data.addressType === 'R') {
      if(data.bname !== '') {
        extraAddress += data.bname;
      }
      if(data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(data)
    console.log(fullAddress)
    console.log(data.zonecode)
  }

  const postCodeStyle = {
    display: "inline-block",
    position: "relative",
    width: "100%",
    height: "90%",
    padding: "7px",
  };

  return (
    <div className='signUpAddressBox'>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode}/>
    </div>
  )

};

export default AddressApi;