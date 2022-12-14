import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/user/userActions';
import { idCheck, nickCheck } from '../../api/user';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useCallback } from 'react';

const StyledInput = styled.input`
  font-size: 0.75rem;
  color: #ffffff;
  border-color: #ffffff;
  border-width: thin;
  border-radius: 5px;
  padding: 0.3rem 0.8rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  outline-color: #ffffff;
  width: 98%;
  height: 2.5rem;
  background-color: #0b0b0b;
  transition: 300ms;
  &[type='radio'] {
    width: 1.5rem;
    vertical-align: middle;
    margin-left: 0.5rem;
  }
  :hover {
    border-color: #ff2c55;
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  &[type='date'] {
  }
`;

const StyledLabel = styled.label`
  /* font-size: small; */
  font-size: 0.75rem;
  text-align: left;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #ff2c55;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  width: 50%;
  margin-left: 10rem;
  opacity: 0.5;
  transition: 500ms;
  :hover {
    opacity: 1;
    font-weight: bold;
  }
`;
const SignupTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupBox = styled.div`
  .welcome {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    margin-top: 2rem;
    margin-bottom: 0;
    text-align: center;
  }
  #gender {
    display: block;
  }
  #male {
    margin-right: 2rem;
  }
  .line {
    border: 0;
    height: 2px;
    background: #ff2c55;
    width: 100%;
    margin-bottom: 2rem;
    margin-top: 1.5rem;
  }
  & form > div {
    margin: 0 10rem;
    width: 50%;
  }
  .icon {
    vertical-align: middle;
    width: 1rem;
  }
  .genderdiv {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  width: 40rem;
`;

const ErrorMessage = styled.div`
  font-size: smaller;
  margin-bottom: 2.5rem;
  .success {
    color: #696565;
  }
  .error {
    color: #ff000091;
  }
`;

const SignUpPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate('/lectures');
    }
  }, [navigate, userInfo]);

  // ?????????, ????????? ????????????
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNickChecked, setIsNickChecked] = useState(false);

  // ???????????? ??????
  const [userId, setUserId] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userPwConfirm, setUserPwConfirm] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userGender, setUserGender] = useState('0');
  const [userProfile, setUserProfile] = useState('img/profile.png');

  // ??????????????? ????????????
  const [userIdMessage, setUserIdMessage] = useState('');
  const [userNicknameMessage, setUserNicknameMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwConfirmMessage, setPwConfirmMessage] = useState('');
  const [userNameMessage, setUserNameMessage] = useState('');
  const [userEmailMessage, setUserEmailMessage] = useState('');
  const [userPhoneMessage, setUserPhoneMessage] = useState('');

  // ????????? ??????
  const [isuserId, setIsUserId] = useState(false);
  const [isuserNickname, setIsUserNickname] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwConfirm, setIsPwConfirm] = useState(false);
  const [isuserName, setIsUserName] = useState(false);
  const [isuserEmail, setIsUserEmail] = useState(false);
  const [isuserPhone, setIsUserPhone] = useState(false);

  // ?????????
  const onChangeId = useCallback(async (e) => {
    const idRegex = /\w{4,16}$/;
    const idCurrent = e.target.value;
    const { statusCode } = await idCheck(idCurrent);
    setUserId(idCurrent);
    if (!idRegex.test(idCurrent)) {
      setUserIdMessage('?????? + ????????? ???????????? 4???????????? 16??????');
      setIsUserId(false);
    } else if (statusCode === 401) {
      setUserIdMessage('????????? ??????????????????!!');
      setIsIdChecked(false);
    } else if (statusCode === 200) {
      setUserIdMessage('????????? ????????? ??????????????? :)');
      setIsIdChecked(true);
      setIsUserId(true);
    }
  }, []);

  // ?????????
  const onChangeNickname = useCallback(async (e) => {
    const nicknameRegex = /\w{2,16}$/;
    const nicknameCurrent = e.target.value;
    const { statusCode } = await nickCheck(nicknameCurrent);
    setUserNickname(nicknameCurrent);
    if (!nicknameRegex.test(nicknameCurrent)) {
      setUserNicknameMessage('2?????? ?????? 16?????? ????????? ??????????????????!');
      setIsUserNickname(false);
    } else if (statusCode === 401) {
      setUserNicknameMessage('????????? ??????????????????!');
      setIsNickChecked(false);
    } else if (statusCode === 200) {
      setUserNicknameMessage('????????? ????????? ??????????????? :)');
      setIsNickChecked(true);
      setIsUserNickname(true);
    }
  }, []);

  // ????????????
  const onChangePw = useCallback((e) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const pwCurrent = e.target.value;
    setUserPw(pwCurrent);

    if (!pwRegex.test(pwCurrent)) {
      setPwMessage('??????+?????????+???????????? ???????????? 8?????? ?????? ??????????????????!');
      setIsPw(false);
    } else {
      setPwMessage('????????? ?????????????????? :)');
      setIsPw(true);
    }
  }, []);

  // ???????????? ??????
  const onChangePwConfirm = useCallback(
    (e) => {
      const pwConfirmCurrent = e.target.value;
      setUserPwConfirm(pwConfirmCurrent);
      console.log(userPw);
      if (userPw === pwConfirmCurrent) {
        setPwConfirmMessage('??????????????? ????????? ??????????????? :)');
        setIsPwConfirm(true);
      } else {
        setPwConfirmMessage('??????????????? ????????????!');
        setIsPwConfirm(false);
      }
    },
    [userPw],
  );

  // ??????
  const onChangeName = useCallback((e) => {
    const nameCurrent = e.target.value;
    setUserName(nameCurrent);
    if (nameCurrent.length < 2) {
      setUserNameMessage('2?????? ?????? ??????????????????!');
      setIsUserName(false);
    } else {
      setUserNameMessage('????????? ?????? ??????????????? :)');
      setIsUserName(true);
    }
  });

  // ?????????
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setUserEmail(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
      setUserEmailMessage('????????? ????????? ????????? ????????????!');
      setIsUserEmail(false);
    } else {
      setUserEmailMessage('????????? ????????? ??????????????? :)');
      setIsUserEmail(true);
    }
  });

  // ????????? ??????
  const onChangePhone = useCallback((e) => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const phoneCurrent = e.target.value;
    setUserPhone(phoneCurrent);
    if (!phoneRegex.test(phoneCurrent)) {
      setUserPhoneMessage('????????? ????????? ????????? ????????????!');
      setIsUserPhone(false);
    } else {
      setUserPhoneMessage('????????? ????????? ??????????????? :)');
      setIsUserPhone(true);
    }
  });

  // ????????????
  const onChangeBirth = useCallback((e) => {
    setUserBirth(e.target.value);
  });

  // ??????
  const onChangeGender = useCallback((e) => {
    setUserGender(e.target.value);
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        registerUser({
          userId,
          userNickname,
          userPw,
          userName,
          userEmail,
          userPhone,
          userBirth,
          userGender,
          userProfile,
        }),
      );
      alert('??????????????? ?????????????????????');
      navigate('/accounts/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignupTemplateBlock>
      <SignupBox>
        <p className="welcome">WELCOME TO CHUKKA</p>
        <hr className="line" />
        <form onSubmit={onSubmit}>
          <div>
            <StyledLabel for="userId">
              ????????? <PersonIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userId"
              name="userId"
              onChange={onChangeId}
              required
              placeholder="???????????? ???????????????"
              autoComplete="off"
            />
            {userId.length > 0 && (
              <ErrorMessage>
                <div className={isuserId && isIdChecked ? 'success' : 'error'}>
                  {userIdMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userNickname">
              ????????? <PersonIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userNickname"
              name="userNickname"
              onChange={onChangeNickname}
              required
              placeholder="???????????? ???????????????"
              autoComplete="off"
            />
            {userNickname.length > 0 && (
              <ErrorMessage>
                <div
                  className={
                    isuserNickname && isNickChecked ? 'success' : 'error'
                  }
                >
                  {userNicknameMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userPw">
              ???????????? <LockIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userPW"
              name="userPw"
              type="password"
              onChange={onChangePw}
              required
              placeholder="??????????????? ???????????????"
            />
            {userPw.length > 0 && (
              <ErrorMessage>
                <div className={isPw ? 'success' : 'error'}>{pwMessage}</div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userPwConfirm">
              ???????????? ?????? <EnhancedEncryptionIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userPwConfirm"
              name="userPwConfirm"
              type="password"
              onChange={onChangePwConfirm}
              required
              placeholder="??????????????? ?????? ???????????????"
            />
            {userPwConfirm.length > 0 && (
              <ErrorMessage>
                <div className={isPwConfirm ? 'success' : 'error'}>
                  {pwConfirmMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userName">
              ?????? <PersonIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userName"
              name="userName"
              onChange={onChangeName}
              required
              placeholder="????????? ???????????????"
              autoComplete="off"
            />
            {userName.length > 0 && (
              <ErrorMessage>
                <div className={isuserName ? 'success' : 'error'}>
                  {userNameMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userEmail">
              ????????? <AlternateEmailIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userEmail"
              name="userEmail"
              type="email"
              onChange={onChangeEmail}
              required
              placeholder="???????????? ???????????????"
              autoComplete="off"
            />
            {userEmail.length > 0 && (
              <ErrorMessage>
                <div className={isuserEmail ? 'success' : 'error'}>
                  {userEmailMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userPhone">
              ????????? ?????? <LocalPhoneIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userPhone"
              name="userPhone"
              onChange={onChangePhone}
              required
              placeholder="????????? ????????? ???????????????"
              autoComplete="off"
            />
            {userPhone.length > 0 && (
              <ErrorMessage>
                <div className={isuserPhone ? 'success' : 'error'}>
                  {userPhoneMessage}
                </div>
              </ErrorMessage>
            )}
          </div>
          <div>
            <StyledLabel for="userBirth">
              ???????????? <CalendarTodayIcon className="icon" />
            </StyledLabel>
            <StyledInput
              id="userBirth"
              name="userBirth"
              type="date"
              onChange={onChangeBirth}
              required
            />
          </div>

          <div className="genderdiv">
            <div>
              <StyledLabel for="male">
                ??????<MaleIcon className="icon"></MaleIcon>
              </StyledLabel>
              <StyledInput
                id="male"
                type="radio"
                name="userGender"
                value="0"
                checked={userGender === '0'}
                onChange={onChangeGender}
              />
            </div>
            <div>
              <StyledLabel for="female">
                ??????<FemaleIcon className="icon"></FemaleIcon>
              </StyledLabel>
              <StyledInput
                id="female"
                type="radio"
                name="userGender"
                value="1"
                checked={userGender === '1'}
                onChange={onChangeGender}
              />
            </div>
          </div>
          <StyledButton
            disabled={
              !isIdChecked ||
              !isNickChecked ||
              !isuserId ||
              !isuserNickname ||
              !isPw ||
              !isPwConfirm ||
              !isuserName ||
              !isuserEmail ||
              !isuserPhone
            }
          >
            JOIN
          </StyledButton>
        </form>
      </SignupBox>
    </SignupTemplateBlock>
  );
};

export default SignUpPage;
