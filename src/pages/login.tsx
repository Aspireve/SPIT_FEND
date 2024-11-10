import { axiosInstance } from "@/lib/axiosInstance";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f2f3f7;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormWrapper = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Logo = styled.img`
  width: 90px;
  height: 100px;
  margin-bottom: 20px;
  align-self: center;
  justify-self: center;
`;

const Title = styled.h2`
  color: #0b894a;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: #f3f3fb;
`;

const SubmitButton = styled.button`
  background-color: #0b894a;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #0a7a42;
  }
`;

type FormValues = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    await axiosInstance.post("auth/login", data).then((res) => {
      console.log(res.data.token.accessToken);
      localStorage.setItem("accessToken", res.data.token.accessToken);
      navigate("/home");
    });
  };

  return (
    <Container>
      <FormWrapper>
        <Logo src="./bio-energy.png" alt="Green Logo" />
        <Title>Login Page</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            {...register("email")}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            {...register("password")}
            placeholder="Password"
            required
          />
          <SubmitButton type="submit">Login</SubmitButton>
        </form>
        <div>
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;
