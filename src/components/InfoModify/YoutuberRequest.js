import React, { useCallback, useEffect, useRef, useState } from "react";
import "./YoutuberRequest.scss";
import { getLoggedInUserData, isUserLoggedIn } from "../../apiService/AuthenticationService";
import UserApiService from "../../apiService/UserApiService";
import { ToastCenter, ToastPreventAccess, ToastTopRight } from "../../modules/ToastModule";
import { Link } from "react-router-dom";

const YoutuberRequest = ({ history }) => {
  /* 잘못된 접근 막기 */
  if (history.action === "POP") {
    ToastPreventAccess("❌ 잘못된 접근 입니다.");
    history.replace("/");
  } else if (isUserLoggedIn === false) {
    ToastPreventAccess("❌ 먼저 로그인 하셔야 합니다.");
    history.replace("/");
  }

  const loggedInUserData = getLoggedInUserData();
  const userId = loggedInUserData && loggedInUserData.id ? loggedInUserData.id : null;

  const [isCompanyRegNumFill, setIsCompanyRegNumFill] = useState();
  const [isPermalinkFill, setIsPermalinkFill] = useState("https://www.youtube.com/channel/고유코드 형식이여야 합니다.");
  const [isYoutuberPicFill, setIsYoutuberPicFill] = useState(
    "아래 예시처럼 시간이 보이는 본인의 유튜브 스튜디오/콘텐츠 화면 스크린샷을 업로드 해주세요."
  );
  const [submitDisableHandler, setSubmitDisableHandler] = useState(true);

  const [previewURL, setpreviewUrl] = useState();
  const youtubeConfirmId = useRef(0);

  const [requestUserData, setRequestUserData] = useState({
    userId: userId,
    bsn: "",
    youtubeUrl: "",
    youtubeConfirmId: youtubeConfirmId.current,
  });

  /* 파일 업로드 관련 */
  let youtuberPic_preview = "";
  youtuberPic_preview = <img className='youtuberPic_preview' src={previewURL} alt='' />;

  const handleFileOnChange = (e) => {
    let file = e.target.files[0];
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    if (e.target.files !== null) {
      const fd = new FormData();
      fd.append("file", file);
      UserApiService.addYoutuberConfirmPic(fd, config)
        .then((response) => {
          const fileUrl = new URL("https://api.withyuja.com/files/temp/" + response.data.fileName);
          setpreviewUrl(fileUrl);
          setIsYoutuberPicFill("");
          youtubeConfirmId.current = response.data.youtubeConfirmId;
        })
        .catch((error) => {
          ToastCenter(error.response.data ? error.response.data.message : "Server Error!");
        });
    }
  };

  /* 파일 업로드 관련 끝 */

  const onChange = useCallback(
    (e) => {
      setRequestUserData({
        ...requestUserData,
        [e.target.name]: e.target.value,
      });
    },
    [requestUserData]
  );

  /* 사업자 등록번호 확인식 */
  const bsnCheck = (e) => {
    let bsn = e.target.value;
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

      if (reminder === Number(bsn[9])) {
        setIsCompanyRegNumFill("");
      } else {
        setIsCompanyRegNumFill("사업자등록번호를 확인해주세요.");
      }
    }
  };
  /* 사업자 등록번호 확인식 끝 */

  /* 고유 주소 확인 */
  const permalinkCheck = useCallback(
    (e) => {
      let checkContent = e.target.value;
      if (
        checkContent !== "" &&
        checkContent.startsWith("https://www.youtube.com/c" || "https://www.youtube.com/channel") &&
        !checkContent.endsWith("/featured")
      ) {
        setIsPermalinkFill("");
      } else {
        setIsPermalinkFill("유튜브 고유주소를 확인해주세요.");
      }
    },
    [setIsPermalinkFill]
  );
  /* 고유 주소 확인 끝 */

  /* 유효성 검사 */
  const submitDisabledCheck = useCallback(() => {
    if (isPermalinkFill === "" && isYoutuberPicFill === "") {
      setSubmitDisableHandler(false);
    }
  }, [isPermalinkFill, isYoutuberPicFill, setSubmitDisableHandler]);

  useEffect(() => {
    submitDisabledCheck();
  }, [submitDisabledCheck]);

  /* 유효성 검사 끝 */

  const totalAction = (e) => {
    insertUserData(e);
  };

  const insertUserData = () => {
    const data = {
      ...requestUserData,
      youtubeConfirmId: youtubeConfirmId.current,
    };
    UserApiService.addYoutuberRequest(data)
      .then((r) => {
        if (r) {
          ToastTopRight("🎉 신청이 완료 되었습니다! 3일 내 확인이 완료 됩니다.");
          history.push("/");
        } else {
          ToastTopRight("❗ 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        ToastCenter(error.response.data ? error.response.data.message : "Server Error!");
      });
  };

  return (
    <div className='YoutuberRequestFrag'>
      <div className='YoutuberRequestHeader'>
        <Link className='header-title' to='/'>
          유자 유튜버 인증 신청
        </Link>
      </div>
      <div className='overlay'>
        <div className='youtuberDiv'>
          <div className='youtuberDiv_Title'>
            유튜브를 시작하셨나요?
            <br />
            <span>유튜버 인증</span>을 위해 추가 정보를 입력해주세요!
            <br />
            <br />
            신청 후 <span>3일</span>내 확인이 완료 됩니다.
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
                  maxLength='10'
                  placeholder='-을 제외한 10자리 숫자'
                  autoComplete='off'
                  onChange={onChange}
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
                  maxLength='70'
                  onChange={onChange}
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
              <div className='youtuberPic_PreviewBox'>{youtuberPic_preview}</div>
              <div className='youtuberPicInputWrapper'>
                <input
                  className='youtuberPicInput'
                  id='youtuberPicInput'
                  type='file'
                  accept='image/jpeg, image/jpg, image/png'
                  onChange={handleFileOnChange}
                />
              </div>
            </label>
          </div>
        </div>
        <div className='signUpSubmitBtnBox'>
          <button type='submit' className='btn btn-warning' onClick={totalAction} disabled={submitDisableHandler}>
            인증 신청하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default YoutuberRequest;
