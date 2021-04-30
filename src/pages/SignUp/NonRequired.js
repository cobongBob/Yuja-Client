import React, { useCallback, useRef, useState } from 'react';
import UserApiService from './UserApiService';
import '../../components/scss/SignUp1.scss';

const NonRequired = ({ location }) => {
  /* 파일 업로드 미리보기 관련 */
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [previewURL, setpreviewUrl] = useState();
  const [previewURL2, setpreviewUrl2] = useState();

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
  const requiredData = location.state;

  /* 이 페이지(nonRequired) 데이터 담기 시작 */
  const [nonRequiredData, setNonRequiredData] = useState({
    address: '',
    phone: '',
    isYoutuber: '',
    bsn: '',
    userIp: '127.5.0.5',
  });

  const changeValue = (e) => {
    setNonRequiredData({
      ...nonRequiredData,
      [e.target.name]: e.target.value,
    });
  };

  const insertUserData = () => {
    Object.assign(requiredData, nonRequiredData);
    const data = requiredData;
    UserApiService.addUser(data).then((r) => {
      console.log(r.data);
    });
  };
  /* 이 페이지(nonRequired) 데이터 담기 끝 */
  /* 회원가입 데이터 넘겨주기 끝 */

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
                  id='YoutuberCheck'
                  type='checkbox'
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
            onClick={insertUserData}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonRequired;
