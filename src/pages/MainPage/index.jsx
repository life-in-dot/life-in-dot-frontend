import { useRecoilValue, useSetRecoilState } from "recoil";

import styled from "styled-components";

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
          <Heading>When did you start your life?</Heading>
          <InputWrapper>
            <input
              type="number"
              name="year"
              value={birthYear}
              onWheel={handleWheelChange}
              readOnly={true}
            />
            <input
              type="number"
              name="month"
              value={birthMonth}
              onWheel={handleWheelChange}
              readOnly={true}
            />
            <input
              type="number"
              name="date"
              value={birthDate}
              onWheel={handleWheelChange}
              readOnly={true}
            />
          </InputWrapper>
          <button type="submit" onClick={handleLoginClick}>
            Login
          </button>
        </Wrapper>
      </form>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  height: calc(100vh - 70px);
  width: 100%;
`;

const InputWrapper = styled.div``;

const Heading = styled.div`
  margin: 30px;
`;

export default MainPage;
