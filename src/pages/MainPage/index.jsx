import { useRecoilState } from "recoil";

import styled from "styled-components";

import birthdayState from "../../lib/recoil/user";
import useInputs from "../../lib/hooks/useInputs";
import calculateBirthday from "../../lib/utils/calculateBirthday";

function MainPage() {
  const [birthday, setBirthday] = useRecoilState(birthdayState);
  const { year, month, day } = birthday;
  const [{ birthYear, birthMonth, birthDay }, onChange, reset] = useInputs({
    birthYear: "",
    birthMonth: "",
    birthDay: "",
  });

  const handleWheelChange = e => calculateBirthday(e, birthday, setBirthday);

  const handleSubmit = e => {
    e.preventDefault();

    onChange({ target: { name: "birthYear", value: year } });
    onChange({ target: { name: "birthMonth", value: month } });
    onChange({ target: { name: "birthDay", value: day } });
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
              value={year}
              onWheel={handleWheelChange}
            />
            <input
              type="number"
              name="month"
              value={month}
              onWheel={handleWheelChange}
            />
            <input
              type="number"
              name="day"
              value={day}
              onWheel={handleWheelChange}
            />
          </InputWrapper>
          <button type="submit">Login</button>
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
  height: calc(100vh - 60px);
`;

const InputWrapper = styled.div``;

const Heading = styled.div`
  margin: 30px;
`;

export default MainPage;
