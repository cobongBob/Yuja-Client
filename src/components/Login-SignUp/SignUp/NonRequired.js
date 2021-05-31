import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserApiService from '../../../apiService/UserApiService';
import './SignUp1.scss';
import AddressApi from './AddressApi';
import {
  ToastCenter,
  ToastPreventAccess,
  ToastTopRight,
} from '../../../modules/ToastModule';

const NonRequired = ({ location, history }) => {
  if (history.action === 'POP') {
    ToastPreventAccess('❌ 잘못된 접근 입니다.');
    history.replace('/');
  }

  /* 파일 업로드 관련 */
  const [previewURL, setpreviewUrl] = useState();
  const [previewURL2, setpreviewUrl2] = useState();
  const profilePicId = useRef(0);
  const youtubeConfirmId = useRef(0);

  const handleFileOnChange = (e) => {
    let file = e.target.files[0];
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    if (e.target.files !== null) {
      const fd = new FormData();
      fd.append('file', file);
      UserApiService.addProfileImg(fd, config)
        .then((response) => {
          const fileUrl = new URL(
            'http://localhost:8888/files/temp/' + response.data.fileName
          );
          setpreviewUrl(fileUrl);
          profilePicId.current = response.data.profilePicId;
        })
        .catch((error) => {
          ToastCenter(
            error.response.data ? error.response.data.message : 'Server Error!'
          );
        });
    }
  };

  const handleFileOnChange2 = (e) => {
    let file2 = e.target.files[0];
    const config2 = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    if (e.target.files !== null) {
      const fd2 = new FormData();
      fd2.append('file', file2);
      UserApiService.addYoutuberConfirmPic(fd2, config2)
        .then((response) => {
          const fileUrl2 = new URL(
            'http://localhost:8888/files/temp/' + response.data.fileName
          );
          setpreviewUrl2(fileUrl2);
          setIsYoutuberPicFill('');
          youtubeConfirmId.current = response.data.youtubeConfirmId;
        })
        .catch((error) => {
          ToastCenter(
            error.response.data ? error.response.data.message : 'Server Error!'
          );
        });
    }
  };

  let profile_preview,
    youtuberPic_preview = '';

  profile_preview = <img className='profile_preview' src={previewURL} alt='' />;

  youtuberPic_preview = (
    <img className='youtuberPic_preview' src={previewURL2} alt='' />
  );
  /* 파일 업로드 끝 */

  /* 회원가입 데이터 넘겨주기 시작 */
  /* required 페이지 데이터 담은 변수 */
  const requiredData = location.state && location.state.requiredData;

  /* 이 페이지(nonRequired) 데이터 담기 시작 */
  const [nonRequiredData, setNonRequiredData] = useState({
    address: '',
    detailAddress: '',
    phone: '',
    isYoutuber: '',
    bsn: '',
    youtubeUrl: '',
    profilePicId: profilePicId.current,
    youtubeConfirmId: youtubeConfirmId.current,
  });

  const changeAddress = (value) => {
    setNonRequiredData({
      ...nonRequiredData,
      address: value,
    });
  };

  const changeValue = (e) => {
    setNonRequiredData({
      ...nonRequiredData,
      [e.target.name]: e.target.value,
    });
  };

  const insertUserData = (e) => {
    const data = {
      ...requiredData,
      ...nonRequiredData,
      profilePicId: profilePicId.current,
      youtubeConfirmId: youtubeConfirmId.current,
    };
    UserApiService.addUser(data)
      .then((r) => {
        if (r) {
          ToastTopRight('🎉 회원가입을 축하합니다!');
          history.push('/');
        } else {
          ToastTopRight('❗ 오류가 발생했습니다.');
        }
      })
      .catch((error) => {
        ToastCenter(
          error.response.data ? error.response.data.message : 'Server Error!'
        );
      });
  };
  /* 이 페이지(nonRequired) 데이터 담기 끝 */
  /* 회원가입 데이터 넘겨주기 끝 */

  /* 사업자 등록번호 확인식 */
  const bsnCheck = (e) => {
    let bsn = e.target.value;
    const checkId = [1, 3, 7, 1, 3, 7, 1, 3, 5, 1];
    let sum = 0;

    if (bsn !== '') {
      for (let i = 0; i < 9; i++) {
        sum += checkId[i] * Number(bsn[i]);
      }
      let checkSum = 0;
      checkSum = Math.floor((checkId[8] * Number(bsn[8])) / 10);
      sum += checkSum;
      let reminder = (10 - (sum % 10)) % 10;

      if (reminder === Number(bsn[9])) {
        setIsCompanyRegNumFill('');
      } else {
        setIsCompanyRegNumFill('사업자등록번호를 확인해주세요.');
      }
    }
  };
  /* 사업자 등록번호 확인식 끝 */

  const totalAction = (e) => {
    insertUserData(e);
  };

  /* 이 페이지(nonRequired) 유효성 끝 */

  /* 유튜버 박스 */
  const isYoutuberRef = useRef();
  const [isYoutuberChecked, setIsYoutuberChecked] = useState();
  const youtuberCheckHandler = useCallback(() => {
    isYoutuberRef.current.checked === true
      ? setIsYoutuberChecked(true)
      : setIsYoutuberChecked(false);
  }, []);
  /* 유튜버 박스 끝 */

  /* 버튼 활성화 */
  const [submitDisableHandler, setSubmitDisableHandler] = useState();

  const [isCompanyRegNumFill, setIsCompanyRegNumFill] = useState();
  const [isPermalinkFill, setIsPermalinkFill] = useState(
    'https://www.youtube.com/channel/고유코드 형식이여야 합니다.'
  );
  const [isYoutuberPicFill, setIsYoutuberPicFill] = useState(
    '아래 예시처럼 시간이 보이는 본인의 유튜브 스튜디오/콘텐츠 화면 스크린샷을 업로드 해주세요.'
  );

  const submitDisabledCheck = useCallback(() => {
    if (isYoutuberChecked === true) {
      setSubmitDisableHandler(true);
      if (isPermalinkFill === '' && isYoutuberPicFill === '') {
        setSubmitDisableHandler(false);
      }
    } else if (isYoutuberChecked === false) {
      setSubmitDisableHandler(false);
    }
  }, [
    isYoutuberChecked,
    isPermalinkFill,
    isYoutuberPicFill,
    setSubmitDisableHandler,
  ]);

  const permalinkCheck = useCallback(
    (e) => {
      let checkContent = e.target.value;
      if (
        checkContent !== '' &&
        checkContent.startsWith(
          'https://www.youtube.com/c' || 'https://www.youtube.com/channel'
        ) &&
        !checkContent.endsWith('/featured')
      ) {
        setIsPermalinkFill('');
      } else {
        setIsPermalinkFill('유튜브 고유주소를 확인해주세요.');
      }
    },
    [setIsPermalinkFill]
  );

  /* 버튼 활성화 끝 */

  useEffect(() => {
    submitDisabledCheck();
  }, [submitDisabledCheck]);

  return (
    <div className='contentBox2'>
      <div className='signUpBar'>
        <div className='dot2'></div>
        <div className='dot3'></div>
        <div className='dot1'></div>
      </div>
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
                  accept='.jpeg, .jpg, .png'
                  placeholder='프로필 사진'
                  onChange={handleFileOnChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className='signUpAddressBox'>
                <AddressApi
                  changeValue={changeValue}
                  changeAddress={changeAddress}
                  setNonRequiredData={setNonRequiredData}
                  nonRequiredData={nonRequiredData}
                />
              </div>
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
                autoComplete='off'
                maxLength='11'
                onChange={changeValue}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label className='signUpLabel' htmlFor='isYoutuber'>
                유튜버이신가요?{' '}
                <input
                  className='YoutuberCheck'
                  name='YoutuberCheck'
                  id='isYoutuber'
                  type='checkbox'
                  ref={isYoutuberRef}
                  onChange={changeValue}
                  onClick={youtuberCheckHandler}
                />
              </label>
            </td>
          </tr>
        </table>
        {isYoutuberChecked === true ? (
          <div className='youtuberDiv'>
            <div className='youtuberDiv_Title'>
              유튜버 분들은 원활한 서비스 이용을 위해
              <br />
              추가 정보를 입력해주세요!
            </div>
            <div className='youtuberInputBox'>
              <div className='companyRegNumBox'>
                <label
                  className='companyRegNumLabel'
                  htmlFor='companyRegNumInput'
                >
                  사업자등록번호 <span> (선택)</span>
                  <input
                    className='companyRegNumInput'
                    name='bsn'
                    id='companyRegNumInput'
                    type='tel'
                    maxLength='10'
                    placeholder='-을 제외한 10자리 숫자'
                    autoComplete='off'
                    onChange={changeValue}
                    onKeyUp={bsnCheck}
                  />
                </label>
              </div>
              <div className='warningBox'>{isCompanyRegNumFill}</div>
              <div className='youtuberUrlBox'>
                <label
                  className='youtuberUrlBoxLabel'
                  htmlFor='youtuberUrlBoxInput'
                >
                  유튜브 고유 주소 <span>(필수)</span>
                  <input
                    className='youtuberUrlBoxInput'
                    name='youtubeUrl'
                    id='youtuberUrlBoxInput'
                    type='text'
                    placeholder='유튜브 고유 주소를 입력해주세요'
                    autoComplete='off'
                    maxLength='70'
                    onChange={changeValue}
                    onKeyUp={permalinkCheck}
                  />
                </label>
              </div>
              <div className='warningBox'>{isPermalinkFill}</div>
            </div>

            <div className='youtuberPicBox'>
              <label className='youtuberPicLabel' htmlFor='youtuberPicInput'>
                유튜브 계정 스크린샷
                <span> (필수)</span>
                <div className='youtuberPicDesc'>{isYoutuberPicFill}</div>
                <div className='youtuberPic_PreviewBox'>
                  {youtuberPic_preview}
                </div>
                <div className='youtuberPicInputWrapper'>
                  <input
                    className='youtuberPicInput'
                    id='youtuberPicInput'
                    type='file'
                    accept='image/jpeg, image/jpg, image/png'
                    onChange={handleFileOnChange2}
                  />
                </div>
              </label>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className='signUpSubmitBtnBox'>
          <button
            type='submit'
            className='btn btn-warning'
            onClick={totalAction}
            disabled={submitDisableHandler}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonRequired;
