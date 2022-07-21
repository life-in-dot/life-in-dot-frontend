import { useRecoilValue, useSetRecoilState } from "recoil";

import styled from "styled-components";
import { CgScrollV } from "react-icons/cg";

import birthdayState, {
  hundredyearsListState,
} from "../../lib/recoil/userYears";

import useInputs from "../../lib/hooks/useInputs";
import useModal from "../../lib/hooks/useModal";
import calculateBirthday from "../../lib/utils/calculateBirthday";

function MainPage() {
  const userBirthday = useRecoilValue(birthdayState);
  const setUserHundredYearsData = useSetRecoilState(hundredyearsListState);
  const { year, month, date } = userBirthday;
  const [{ birthYear, birthMonth, birthDate }, onChange, reset] = useInputs({
    birthYear: year,
    birthMonth: month,
    birthDate: date,
  });

  const { showModal } = useModal();

  const handleWheelChange = e => {
    const birthday = { birthYear, birthMonth, birthDate };
    calculateBirthday(e, birthday, onChange);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setUserHundredYearsData({
      year: birthYear,
      month: birthMonth,
      date: birthDate,
    });
  };

  const handleLoginClick = () => {
    showModal({
      modalType: "LoginModal",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <Heading>
            <p>When is your birthday?</p>
            <p>Scroll on numbers.</p>
          </Heading>
          <InputWrapper>
            <InputFieldDiv>
              <InputField
                type="number"
                name="year"
                value={birthYear}
                onWheel={handleWheelChange}
                onTouchMove={handleWheelChange}
                readOnly={true}
              />
              <ScrollIcon />
            </InputFieldDiv>
            <InputFieldDiv>
              <InputField
                type="number"
                name="month"
                value={birthMonth}
                onWheel={handleWheelChange}
                onTouchMove={handleWheelChange}
                readOnly={true}
              />
              <ScrollIcon />
            </InputFieldDiv>
            <InputFieldDiv>
              <InputField
                type="number"
                name="date"
                value={birthDate}
                onWheel={handleWheelChange}
                onTouchMove={handleWheelChange}
                readOnly={true}
              />
              <ScrollIcon />
            </InputFieldDiv>
          </InputWrapper>
          <LoginButton type="submit" onClick={handleLoginClick}>
            Login
          </LoginButton>
        </Wrapper>
      </form>
    </>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  @media (max-width: 780px) {
    width: 300px;
  }
  width: 500px;
  height: 350px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  border-radius: 200px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 80px 0 rgba(255, 255, 255, 0.2);
  transition: all 200ms ease-in 0s;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  border-radius: 30px;
`;

const InputFieldDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 780px) {
    margin-left: 0.8rem;
    margin-right: 0.8rem;
  }
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 30px 0 rgba(255, 255, 255, 0.2);

  :hover {
    opacity: 0.8;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 30px 0 rgba(255, 255, 255, 0.4);
  }
`;

const InputField = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  text-align: center;
  @media (max-width: 780px) {
    padding-left: 0px;
    height: 90px;
    width: 3rem;
  }
  padding-left: 14px;
  height: 60px;
  width: 5rem;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0.8;
  transition: all 200ms ease-in 0s;
  outline: none;

  :hover {
    cursor: ns-resize;
  }
`;

const ScrollIcon = styled(CgScrollV)`
  height: 30px;
  width: 30px;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0.8;
`;

const Heading = styled.div`
  margin: 20px;
  text-align: center;
  padding: 15px;
  font-size: 1.1rem;
  border-radius: 30px;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0.8;

  p {
    margin-bottom: 8px;
  }
`;

const LoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 30px 0 rgba(255, 255, 255, 0.2);
  @media (max-width: 780px) {
    width: 6rem;
  }
  height: 50px;
  width: 7rem;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0.8;
  border-radius: 30px;
  transition: all 200ms ease-in 0s;

  :hover {
    border: 1px solid #b8d0d5;
    opacity: 0.8;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`;

export default MainPage;
