import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { login } from "@/apis/auth/login";
import { logInUserInfoType } from "@/@types/AuthTypes";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<logInUserInfoType>({
    email: "",
    password: "",
  });

  const onClickLogInHandler = useCallback(async () => {
    try {
      const result = await login(userInfo);

      if (result.email) {
        navigate("/chat");
      }
    } catch (err) {
      alert("로그인에 실패했습니다.");
    }
  }, [navigate, userInfo]);

  const onClickCancelHandler = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onChangeValueHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, currKey: string) => {
      const { value } = event.target;

      if (value === null) return;

      if (currKey === "email") {
        setUserInfo((prev) => {
          return {
            ...prev,
            email: value,
          };
        });
      } else if (currKey === "password") {
        setUserInfo((prev) => {
          return {
            ...prev,
            password: value,
          };
        });
      }
    },
    [],
  );

  const onEnterHandler = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { keyCode } = event;
      if (keyCode === 13) {
        await onClickLogInHandler();
      }
    },
    [userInfo],
  );

  return (
    <LogInContainer>
      <TitleText>LOGIN</TitleText>
      <InputContainer>
        <Input
          placeholder={"email"}
          type={"string"}
          value={userInfo.email}
          onChange={onChangeValueHandler}
          onEnter={onEnterHandler}
          icon={"user"}
        />
        <Input
          placeholder={"password"}
          type={"password"}
          value={userInfo.password}
          onChange={onChangeValueHandler}
          onEnter={onEnterHandler}
          icon={"password"}
        />
      </InputContainer>
      <ButtonContainer>
        <Button theme={"light"} text={"LOGIN"} onClick={onClickLogInHandler} />
        <Button theme={"dark"} text={"Cancel"} onClick={onClickCancelHandler} />
      </ButtonContainer>
    </LogInContainer>
  );
};

export default Login;

const LogInContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  background-color: var(--theme-color-1);
`;

const TitleText = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: var(--theme-color-4);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 20rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 20rem;
`;
