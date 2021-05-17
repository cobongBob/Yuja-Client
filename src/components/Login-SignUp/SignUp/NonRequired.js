import React, { useCallback, useEffect, useRef, useState } from "react";
import UserApiService from "../../../apiService/UserApiService";
import "./SignUp1.scss";
import AddressApi from "./AddressApi";

const NonRequired = ({ location, history }) => {
  /* 파일 업로드 관련 */
  const [previewURL, setpreviewUrl] = useState();
  const [previewURL2, setpreviewUrl2] = useState();
  const profilePicId = useRef(0);
  const youtubeConfirmId = useRef(0);

  const handleFileOnChange = (e) => {
    let file = e.target.files[0];
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    if (e.target.files !== null) {
      console.log("파일 업로드 시작");
      const fd = new FormData();
      fd.append("file", file);
      UserApiService.addProfileImg(fd, config)
        .then((response) => {
          const fileUrl = new URL("http://localhost:8888/files/temp/" + response.data.fileName);
          setpreviewUrl(fileUrl);
          profilePicId.current = response.data.profilePicId;
          console.log(1, response.data.profilePicId);
          console.log(profilePicId.current);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  };

  const handleFileOnChange2 = (e) => {
    let file2 = e.target.files[0];
    const config2 = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    if (e.target.files !== null) {
      console.log("파일 업로드2 시작");
      const fd2 = new FormData();
      fd2.append("file", file2);
      UserApiService.addYoutuberConfirmPic(fd2, config2)
        .then((response) => {
          const fileUrl2 = new URL("http://localhost:8888/files/temp/" + response.data.fileName);
          setpreviewUrl2(fileUrl2);
          setIsYoutuberPicFill("");
          youtubeConfirmId.current = response.data.youtubeConfirmId;
          console.log(2, response.data.youtubeConfirmId);
          console.log(youtubeConfirmId.current);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  };

  let profile_preview,
    youtuberPic_preview = "";

  profile_preview = <img className='profile_preview' src={previewURL} alt='' />;

  youtuberPic_preview = <img className='youtuberPic_preview' src={previewURL2} alt='' />;
  /* 파일 업로드 끝 */

  /* 회원가입 데이터 넘겨주기 시작 */
  /* required 페이지 데이터 담은 변수 */
  const requiredData = location.state.requiredData;
  console.log("???", requiredData);

  /* 이 페이지(nonRequired) 데이터 담기 시작 */
  const [nonRequiredData, setNonRequiredData] = useState({
    address: "",
    detailAddress: "",
    phone: "",
    isYoutuber: "",
    bsn: "",
    youtubeUrl: "",
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
    console.log(data);
    UserApiService.addUser(data)
      .then((r) => {
        console.log(r);
        if (r) {
          alert("회원가입을 축하합니다!");
          history.push("/");
        } else {
          alert("오류가 발생했습니다.");
        }
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };
  /* 이 페이지(nonRequired) 데이터 담기 끝 */
  /* 회원가입 데이터 넘겨주기 끝 */

  /* 이 페이지(nonRequired) 유효성 검사 */
  const checkNonRequiredUserData = (e) => {
    let address = nonRequiredData.address;
    let phone = nonRequiredData.phone;

    const addressCheck = /^[a-zA-Z0-9가-힣ㄱ-ㅎ ]{2,20}$/;
    const phoneCheck = /^(01[016789]{1})\d{3,4}\d{4}$/;

    if (address.length !== 0 && false === addressCheck.test(address)) {
      alert("주소를 확인해주세요!");
      e.preventDefault();
      return false;
    } else if (phone.length !== 0 && false === phoneCheck.test(phone)) {
      alert("연락처를 확인해주세요!");
      e.preventDefault();
      return false;
    } else {
      return true;
    }
  };

  /* 사업자 등록번호 확인식 */
  const bsnCheck = (e) => {
    console.log("bsncheck 작동");
    let bsn = e.target.value;
    console.log(bsn);
    const checkId = [1, 3, 7, 1, 3, 7, 1, 3, 5, 1];
    let sum = 0;

    if (bsn !== "") {
      for (let i = 0; i < 9; i++) {
        sum += checkId[i] * Number(bsn[i]);
      }
      let checkSum = 0;
      checkSum = Math.floor((checkId[8] * Number(bsn[8])) / 10);
      sum += checkSum;
      let reminder = (10 - (sum % 10)) % 10;

      console.log(bsn.length);
      if (reminder === Number(bsn[9])) {
        setIsCompanyRegNumFill("");
      } else {
        setIsCompanyRegNumFill("사업자등록번호를 확인해주세요.");
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
    isYoutuberRef.current.checked === true ? setIsYoutuberChecked(true) : setIsYoutuberChecked(false);
  }, []);
  /* 유튜버 박스 끝 */

  /* 버튼 활성화 */
  const [submitDisableHandler, setSubmitDisableHandler] = useState();

  const [isCompanyRegNumFill, setIsCompanyRegNumFill] = useState();
  const [isPermalinkFill, setIsPermalinkFill] = useState();
  const [isYoutuberPicFill, setIsYoutuberPicFill] = useState(
    "아래 예시처럼 시간이 보이는 본인의 유튜브 스튜디오/콘텐츠 화면 스크린샷을 업로드 해주세요."
  );

  const submitDisabledCheck = useCallback(() => {
    console.log("submitDisabledCheck 실행", isYoutuberChecked);
    if (isYoutuberChecked === true) {
      setSubmitDisableHandler(true);
      console.log(isCompanyRegNumFill);
      console.log(isPermalinkFill);
      console.log(isYoutuberPicFill);
      if (isPermalinkFill === "" && isYoutuberPicFill === "") {
        setSubmitDisableHandler(false);
      }
    } else if (isYoutuberChecked === false) {
      console.log("else로");
      setSubmitDisableHandler(false);
    }
  }, [isYoutuberChecked, isPermalinkFill, isYoutuberPicFill, setSubmitDisableHandler, isCompanyRegNumFill]);

  const permalinkCheck = useCallback((e) => {
    let checkContent = e.target.value;
    if (checkContent !== "" && checkContent.startsWith("https://www.youtube.com/")) {
      setIsPermalinkFill("");
    } else {
      setIsPermalinkFill("유튜브 고유주소를 확인해주세요.");
    }
  }, []);
  /* 버튼 활성화 끝 */

  useEffect(() => {
    submitDisabledCheck();
  }, [submitDisabledCheck]);

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
              <div className='signUpAddressBox'>
                <AddressApi changeValue={changeValue} changeAddress={changeAddress} />
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
                유튜버이신가요?{" "}
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
                <label className='companyRegNumLabel' htmlFor='companyRegNumInput'>
                  사업자등록번호 <span> (선택)</span>
                  <input
                    className='companyRegNumInput'
                    name='bsn'
                    id='companyRegNumInput'
                    type='tel'
                    maxLength={10}
                    placeholder='-을 제외한 10자리 숫자'
                    autoComplete='off'
                    onChange={changeValue}
                    onKeyUp={bsnCheck}
                  />
                </label>
              </div>
              <div className='warningBox'>{isCompanyRegNumFill}</div>
              <div className='youtuberUrlBox'>
                <label className='youtuberUrlBoxLabel' htmlFor='youtuberUrlBoxInput'>
                  유튜브 고유 주소 <span>(필수)</span>
                  <input
                    className='youtuberUrlBoxInput'
                    name='youtubeUrl'
                    id='youtuberUrlBoxInput'
                    type='text'
                    placeholder='유튜브 고유 주소를 입력해주세요'
                    autoComplete='off'
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
              </label>
              <div className='youtuberPicDesc'>{isYoutuberPicFill}</div>
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
        ) : (
          ""
        )}
        <div className='signUpSubmitBtnBox'>
          <button type='submit' className='btn btn-warning' onClick={totalAction} disabled={submitDisableHandler}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonRequired;
