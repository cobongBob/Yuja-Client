import React, { useCallback, useEffect, useRef, useState } from "react";
import "./InfoModify.scss";
import { Link } from "react-router-dom";
import { getLoggedInUserData, isUserLoggedIn } from "../../apiService/AuthenticationService";
import { ToastCenter, ToastPreventAccess, ToastTopRight } from "../../modules/ToastModule";
import UserApiService, { getUserData, modifyUserData } from "../../apiService/UserApiService";
import axios from "axios";
import AddressApi from "../Login-SignUp/SignUp/AddressApi";

const InfoModify = ({ history }) => {
  // /* 잘못된 접근 막기 */
  //  if (history.action === "POP") {
  //    ToastPreventAccess("❌ 잘못된 접근 입니다.");
  //    history.replace("/");
  //  } else if(isUserLoggedIn === false) {
  //    ToastPreventAccess("❌ 먼저 로그인 하셔야 합니다.");
  //   history.replace("/");
  //  }
  const loggedInUserData = getLoggedInUserData();
  console.log("갖고오자마자 값 ", loggedInUserData);
  const userId = loggedInUserData && loggedInUserData.id ? loggedInUserData.id : null;

  const [previewURL, setpreviewUrl] = useState();
  const [previewURL2, setpreviewUrl2] = useState();
  const profilePicId = useRef(0);
  const youtubeConfirmId = useRef(0);

  const [userData, setUserData] = useState({
    username: "",
    realName: "",
    nickname: "",
    bday: "",
    address: "",
    detailAddress: "",
    phone: "",
    bsn: "",
    youtubeUrl: "",
    profilePicId: profilePicId.current,
    youtubeConfirmId: youtubeConfirmId.current,
    profilePic: "",
  });
  const [nicknameDesc, setNicknameDesc] = useState();
  const [birthDesc, setBirthDesc] = useState();
  const [isCompanyRegNumFill, setIsCompanyRegNumFill] = useState();
  const [isPermalinkFill, setIsPermalinkFill] = useState();
  const [isYoutuberPicFill, setIsYoutuberPicFill] = useState();

  const modifyProfilePicUrl = new URL("http://localhost:8888/files/profiles/" + userData.profilePic);
  const modifyConfirmPicUrl = new URL("http://localhost:8888/files/youtubeConfirm/" + userData.youtubeConfirmImg);

  const { current: birthCheck } = useRef(/^([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))$/);

  useEffect(() => {
    getUserData(userId).then((res) => {
      console.log("res.data의 값", res.data);
      setUserData({
        username: res.data.username,
        realName: res.data.realName,
        nickname: res.data.nickname,
        bday: res.data.bday,
        address: res.data.address,
        detailAddress: res.data.detailAddress,
        phone: res.data.phone,
        bsn: res.data.bsn,
        youtubeUrl: res.data.youtubeUrl,
        profilePic: res.data.profilePic,
        youtubeConfirmImg: res.data.youtubeConfirmImg,
      });
    });
  }, []);

  console.log("userData의 값", userData);

  const onChange = useCallback(
    (e) => {
      console.log("onChange");
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    },
    [userData]
  );

  const onClick = useCallback((e) => {
    e.target.value = "";
  }, []);

  const checkNicknameValidate = useCallback(() => {
    axios.post("http://localhost:8888/api/auth/checknickname", userData).then((res) => {
      if (res.data !== "") {
        setNicknameDesc(res.data);
      } else if (res.data === "") {
        setNicknameDesc("");
      }
    });
  }, [userData]);

  const checkBirthValidate = useCallback(() => {
    birthCheck.test(userData.bday) === false && userData.bday !== ""
      ? setBirthDesc("-을 제외한 생년월일 6자리만 입력해주세요.")
      : setBirthDesc("");
  }, [birthCheck, userData]);

  const changeAddress = (value) => {
    setUserData({
      ...userData,
      address: value,
    });
  };

  const bringDetailAddress = (value) => {
    console.log("onChange");
    setUserData({
      ...userData,
      detailAddress: value,
    });
  };

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
      if (checkContent !== "" && checkContent.startsWith("https://www.youtube.com/")) {
        setIsPermalinkFill("");
      } else {
        setIsPermalinkFill("유튜브 고유주소를 확인해주세요.");
      }
    },
    [setIsPermalinkFill]
  );
  /* 고유 주소 확인 끝 */

  /* 파일 업로드 관련 */
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
      UserApiService.addProfileImg(fd, config)
        .then((response) => {
          const fileUrl = new URL("http://localhost:8888/files/temp/" + response.data.fileName);
          setpreviewUrl(fileUrl);
          profilePicId.current = response.data.profilePicId;
        })
        .catch((error) => {
          ToastCenter(error.response.data ? error.response.data.message : "Server Error!");
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
      const fd2 = new FormData();
      fd2.append("file", file2);
      UserApiService.addYoutuberConfirmPic(fd2, config2)
        .then((response) => {
          const fileUrl2 = new URL("http://localhost:8888/files/temp/" + response.data.fileName);
          setpreviewUrl2(fileUrl2);
          setIsYoutuberPicFill("");
          youtubeConfirmId.current = response.data.youtubeConfirmId;
        })
        .catch((error) => {
          ToastCenter(error.response.data ? error.response.data.message : "Server Error!");
        });
    }
  };

  let profile_preview,
    youtuberPic_preview = "";

  profile_preview = (
    <img
      className='profile_preview'
      src={modifyProfilePicUrl && previewURL ? previewURL : modifyProfilePicUrl}
      alt=''
    />
  );

  youtuberPic_preview = (
    <img
      className='youtuberPic_preview'
      src={modifyConfirmPicUrl && previewURL2 ? previewURL2 : modifyConfirmPicUrl}
      alt=''
    />
  );
  /* 파일 업로드 끝 */

  const modifyBtn = useCallback(() => {
    console.log(userId);
    modifyUserData(userId)
      .then((r) => {
        if (r) {
          ToastTopRight("🎉 정보가 수정 되었습니다.");
          history.push("/");
        } else {
          ToastTopRight("❌ 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        ToastCenter(error.response.data ? error.response.data.message : "Server Error!");
      });
  }, [userId, history]);

  return (
    userData && (
      <div className='infoModifyFrag'>
        <div className='infoModifyTitleBox'>
          <Link className='infoModifyTitle' to='/'>
            유자 회원정보 수정
          </Link>
        </div>
        <div className='infoModifyContentBox'>
          <div className='overlay'>
            <div className='infoModifyDescBoxDescBox'>
              <span>{loggedInUserData.nickname}</span>님 정보수정
            </div>

            <div className='required'>* 필수입력 정보입니다.</div>

            <table className='infoModifyTable'>
              <tr>
                <td>
                  <div className='labelWrapper'>
                    <label htmlFor='infoModifyId'>이메일</label>
                  </div>
                  <input
                    className='infoModifyId'
                    name='username'
                    type='email'
                    placeholder='아이디(이메일)'
                    autoComplete='off'
                    disabled={true}
                    value={userData.username}
                    autoFocus
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className='labelWrapper'>
                    <label htmlFor='infoModifyName'>이름(실명)</label>
                  </div>
                  <input
                    className='infoModifyName'
                    name='realName'
                    type='text'
                    placeholder='이름(실명)'
                    autoComplete='off'
                    disabled={true}
                    value={userData.realName}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className='labelWrapper'>
                    <label htmlFor='infoModifyNickname'>닉네임</label>
                  </div>
                  <input
                    className='infoModifyNickname'
                    name='nickname'
                    type='text'
                    maxLength='20'
                    placeholder='닉네임'
                    autoComplete='off'
                    value={userData.nickname}
                    onChange={onChange}
                    onClick={onClick}
                    onKeyUp={checkNicknameValidate}
                  />
                  <div className='warningBox'>{nicknameDesc}</div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className='labelWrapper'>
                    <label htmlFor='infoModifyBirthdate'>생년월일</label>
                  </div>
                  <input
                    className='infoModifyBirthdate'
                    name='bday'
                    type='text'
                    maxLength='6'
                    placeholder='생년월일(-을 제외한 6자리)'
                    autoComplete='off'
                    value={userData.bday}
                    onChange={onChange}
                    onClick={onClick}
                    onKeyUp={checkBirthValidate}
                  />
                  <div className='warningBox'>{birthDesc}</div>
                </td>
              </tr>

              <div className='required2'>* 선택입력 정보입니다.</div>

              <tr>
                <td>
                  <div className='labelWrapper'>
                    <label htmlFor='signUpProfilePic'>프로필 사진</label>
                  </div>
                  <div className='modifyProfilePicPreview'>{profile_preview}</div>
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
                    <AddressApi
                      changeAddress={changeAddress}
                      address={userData.address}
                      detailAddress={userData.detailAddress}
                      onClick={onClick}
                      userData={userData}
                      setUserData={setUserData}
                      bringDetailAddress={bringDetailAddress}
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
                    onChange={onChange}
                    value={userData.phone}
                    onClick={onClick}
                  />
                </td>
              </tr>
            </table>
            {userData.youtubeUrl !== null ? (
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
                        onChange={onChange}
                        onKeyUp={bsnCheck}
                        value={userData.bsn}
                        onClick={onClick}
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
                        onChange={onChange}
                        onKeyUp={permalinkCheck}
                        value={userData.youtubeUrl}
                        onClick={onClick}
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
            <div className='infoModifySubmitBtnBox'>
              <button type='submit' className='btn btn-warning' onClick={modifyBtn}>
                수정완료
              </button>
            </div>
          </div>
          <footer className='infoModifyFooter'></footer>
        </div>
      </div>
    )
  );
};

export default InfoModify;
