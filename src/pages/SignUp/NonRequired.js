import React, { useCallback, useRef, useState } from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import '../../components/scss/SignUp1.scss';

const NonRequired = () => {
  const [file, setFile] = useState();
  const [previewURL, setpreviewUrl] = useState();

  const handleFileOnChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setpreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  let profile_preview = null;
  if (file !== '') {
    profile_preview = <img className='profile_preview' src={previewURL} />;
  }

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
                type='text'
                placeholder='여기 주소 api 생각하셔야 합니다 -족장-'
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
                type='tel'
                placeholder='-를 제외한 11자리'
              />
            </td>
          </tr>
          <tr>
            <td>
              <label className='signUpLabel' htmlFor='YoutuberCheck'>
                유튜버이신가요?{' '}
                <input
                  className='signUpYoutuber'
                  id='YoutuberCheck'
                  type='checkbox'
                />
              </label>
            </td>
          </tr>
        </table>
        <div className='youtuberDiv'>
          <div className='youtuberDiv_Title'>
            유튜버 분들은 원활한 서비스 이용을 위해 추가 정보를 입력해주세요!
          </div>
          <div className='companyRegNumBox'>
            <label className='companyRegNumLabel' htmlFor='companyRegNumInput'>
              사업자등록번호
              <input
                className='companyRegNumInput'
                id='companyRegNumInput'
                type='tel'
                placeholder='-을 제외한 10자리 숫자'
              />
            </label>
          </div>
        </div>
        <div className='signUpSubmitBtnBox'>
          <button type='button' className='btn btn-warning' type='submit'>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonRequired;
