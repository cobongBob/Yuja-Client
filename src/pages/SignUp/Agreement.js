import React, { useEffect, useRef, useState } from "react";
import '../../components/scss/SignUp1.scss';

const Agreement = () => {

  const [checkedList, setcheckedList] = useState ([
    {id: 'serviceCheck', isChecked: true},
    {id: 'privateCheck', isChecked: true},
    {id: 'marketingCheck', isChecked: true}
  ])

  const [allChecked, setallChecked] = useState({
    id: 'titleCheck', isChecked: true
})

  const allCheckChange = ({ target : {checked}}) => {
    const newAllChecked = {
      ...allChecked,
      isChecked: checked
    }
    setallChecked(newAllChecked)

    // 다른 체크박스들 state 확인
    let allCheck = [...checkedList]
    allCheck.forEach(item => {
      item.isChecked = newAllChecked.isChecked;
    })
    setcheckedList(allCheck)
  }

  const checkBoxChange = ({target : { name, checked }}) => {
    let newCheckBoxes = [...checkedList]
    newCheckBoxes.forEach(item => {
      if(item.id === name) {
        item.isChecked = checked
      }
    })
    setcheckedList(newCheckBoxes)

    const isAllCheckBoxChecked = newCheckBoxes.every((value) => value.isChecked)
    setallChecked({...allChecked, isAllCheckBoxChecked})
  }

  return (
    <div className="agreement">
      <div className="required3">
        * 약관동의
      </div>
      <div className="agreementBox">
        <div className="agreementTitle">
          이용약관, 개인정보 수집 및 이용, 광고성 정보 수신(선택)에 모두 동의합니다.
          {' '}
          <input
            className='titleCheck'
            id='titleCheck'
            type='checkbox'
            checked={allChecked.isChecked}
            onChange={allCheckChange}
          />
        </div>
        <div className="agreementService">
          유자 서비스 이용약관 동의 (필수)
          {' '}
          {checkedList.map(item => (
          <input
            className='serviceCheck'
            id={item.id}
            type='checkbox'
            checked={item.isChecked}
            onChange={checkBoxChange}
          />
            ))}
        </div>
        <div className="agreementPrivate">
          개인정보 수집 및 이용 동의 (필수)
          {' '}
          <input
            className='privateCheck'
            id='privateCheck'
            type='checkbox'
          />
        </div>
        <div className="agreementMarketing">
          마케팅 정보 수신에 대한 동의 (선택)
          {' '}
          <input
            className='marketingCheck'
            id='marketingCheck'
            type='checkbox'
          />
        </div>
      </div>
    </div>
  )
};

export default Agreement;