import React, { useCallback, useMemo, useRef, useState } from 'react';
import UserApiService from './UserApiService';
import './SignUp1.scss';
import axios from 'axios';

const NonRequired = ({ location, history }) => {
  /* 파일 업로드 미리보기 관련 */
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [previewURL, setpreviewUrl] = useState();
  const [previewURL2, setpreviewUrl2] = useState();
  const profilePicId = useRef(0);

  const handleFileOnChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);

    reader.onloadend = () => {
      setFile(file);
      setpreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    if (e.target.files !== null) {
      console.log('파일 업로드 시작');
      const fd = new FormData();
      fd.append('file', file);
      const res = UserApiService.addProfileImg(fd, config).then((response) => {
        profilePicId.current = response.data.profilePicId;
        console.log(1, response.data.profilePicId);
        console.log(profilePicId.current);
      });
    }
  };

  const handleFileOnChange2 = (e) => {
    e.preventDefault();
    let reader2 = new FileReader();
    let file2 = e.target.files[0];
    reader2.onloadend = () => {
      setFile2(file2);
      setpreviewUrl2(reader2.result);
    };
    reader2.readAsDataURL(file2);
  };

  let profile_preview,
    youtuberPic_preview = null;

  if (file !== '') {
    profile_preview = <img className='profile_preview' src={previewURL} />;
  }
  if (file2 !== '') {
    youtuberPic_preview = (
      <img className='youtuberPic_PreviewBox' src={previewURL2} />
    );
  }
  /* 파일 업로드 미리보기 끝 */

  /* 회원가입 데이터 넘겨주기 시작 */
  /* required 페이지 데이터 담은 변수 */
  const requiredData = location.state.requiredData;

  /* 이 페이지(nonRequired) 데이터 담기 시작 */
  const [nonRequiredData, setNonRequiredData] = useState({
    address: '',
    phone: '',
    isYoutuber: '',
    bsn: '',
    userIp: '127.5.0.5',
    profilePicId: profilePicId.current,
  });

  const changeValue = (e) => {
    setNonRequiredData({
      ...nonRequiredData,
      [e.target.name]: e.target.value,
    });
  };

  const insertUserData = (e) => {
    // Object.assign({...requiredData, ...nonRequiredData,profilePicId: profilePicId.current});
    const data = {
      ...requiredData,
      ...nonRequiredData,
      profilePicId: profilePicId.current,
    };
    console.log(data);
    UserApiService.addUser(data)
      .then((r) => {
        console.log(r);
        if (r) {
          alert('회원가입을 축하합니다!');
          history.push('/');
        } else {
          alert('비어있는 항목이 있습니다! 나가!');
        }
      })
      .catch(() => {
        alert('오류가 발생했습니다. 나가!');
      });
  };
  /* 이 페이지(nonRequired) 데이터 담기 끝 */
  /* 회원가입 데이터 넘겨주기 끝 */

  /* 이 페이지(nonRequired) 유효성 검사 */
  const checkNonRequiredUserData = (e) => {
    let address = nonRequiredData.address;
    let phone = nonRequiredData.phone;
    let userIp = nonRequiredData.userIp;

    const addressCheck = /^[a-zA-Z0-9가-힣ㄱ-ㅎ ]{2,20}$/;
    const phoneCheck = /^(01[016789]{1})\d{3,4}\d{4}$/;
    const userIpCheck = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

    if (address.length !== 0 && false === addressCheck.test(address)) {
      alert('주소를 확인해주세요!');
      e.preventDefault();
      return false;
    } else if (phone.length !== 0 && false === phoneCheck.test(phone)) {
      alert('연락처를 확인해주세요!');
      e.preventDefault();
      return false;
    } else {
      return true;
    }
  };

  /* 사업자 등록번호 확인식 */
  const bsnCheck = (e) => {
    let bsn = nonRequiredData.bsn;
    const checkId = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    let sum = 0;

    if (bsn.length !== 0) {
      for (let i = 0; i < 9; i++) {
        sum += checkId[i] * Number(bsn[i]);
      }
      let checkSum = 0;
      checkSum = Math.floor((checkId[8] * Number(bsn[8])) / 10);
      sum += checkSum;
      let reminder = (10 - (sum % 10)) % 10;
      if (reminder === Number(bsn[9])) {
        alert('사업자등록번호 일치');
        return true;
      } else {
        alert('유효한 사업자 등록번호를 입력해주세요!');
        e.preventDefault();
        return false;
      }
    }
    return true;
  };
  /* 사업자 등록번호 확인식 끝 */

  const totalAction = (e) => {
    if (checkNonRequiredUserData(e) === true && bsnCheck(e) === true) {
      insertUserData(e);
    }
  };

  /* 이 페이지(nonRequired) 유효성 끝 */

  return (
    <div className='contentBox2'>
      <div className='overlay'>
        <div className='required2'>* 선택입력 정보입니다.</div>
        <table className='signUpTable'>
          <tr>
            <td>
              <div className='labelWrapper'>
                <label htmlFor='signUpProfilePic'>프로필 사진</label>
              </div>
              <div className='ProfilePicPreview'>{profile_preview}</div>
              <div className='inputWrapper'>
                <input
                  className='signUpProfilePic'
                  type='file'
                  name='profile_img'
                  accept='image/jpeg, image/jpg, img/png'
                  placeholder='프로필 사진'
                  onChange={handleFileOnChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className='labelWrapper'>
                <label htmlFor='signUpAddress'>주소</label>
              </div>
              <input
                className='signUpAddress'
                name='address'
                type='text'
                placeholder='주소'
                onChange={changeValue}
              />
            </td>
          </tr>
          <tr>
            <td>
              <div className='labelWrapper'>
                <label htmlFor='signUpTel'>연락처</label>
              </div>
              <input
                className='signUpTel'
                name='phone'
                type='tel'
                placeholder='-를 제외한 11자리'
                onChange={changeValue}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label className='signUpLabel' htmlFor='YoutuberCheck'>
                유튜버이신가요?{' '}
                <input
                  className='signUpYoutuber'
                  name='isYoutuber'
                  id='isYoutuber'
                  type='checkbox'
                  onChange={changeValue}
                />
              </label>
            </td>
          </tr>
        </table>
        <div className='youtuberDiv'>
          <div className='youtuberDiv_Title'>
            유튜버 분들은 원활한 서비스 이용을 위해
            <br />
            추가 정보를 입력해주세요!
          </div>
          <div className='companyRegNumBox'>
            <label className='companyRegNumLabel' htmlFor='companyRegNumInput'>
              사업자등록번호
              <input
                className='companyRegNumInput'
                name='bsn'
                id='companyRegNumInput'
                type='tel'
                maxLength={10}
                placeholder='-을 제외한 10자리 숫자'
                onChange={changeValue}
              />
            </label>
          </div>
          <div className='youtuberPicBox'>
            <label className='youtuberPicLabel' htmlFor='youtuberPicInput'>
              유튜브 계정 스크린샷을 올려주세요
            </label>
            <div className='youtuberPic_PreviewBox'>{youtuberPic_preview}</div>
            <div className='youtuberPicInputWrapper'>
              <input
                className='youtuberPicInput'
                id='youtuberPicInput'
                type='file'
                accept='image/jpeg, image/jpg, img/png'
                onChange={handleFileOnChange2}
              />
            </div>
          </div>
        </div>
        <div className='signUpSubmitBtnBox'>
          <button
            type='submit'
            className='btn btn-warning'
            onClick={totalAction}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonRequired;
