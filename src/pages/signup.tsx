import { axiosInstance } from "@/lib/axiosInstance";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  // name: string;
  email: string;
  password: string;
  // confirmPassword: string;
};

const SignUpPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    console.log("Sign Up Data:", data);
    await axiosInstance.post("/auth/register", data);
    navigate("/home");
  };

  return (
    <Container>
      <FormWrapper>
        <Logo src="src/assets/images/bio-energy.png" alt="Green Logo" />
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            {...register("name")}
            placeholder="Username"
            required
          />
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
          <Input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            required
          />
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>
        <div>
          Already have an account? <a href="/login">Login</a>
        </div>
      </FormWrapper>
    </Container>
  );
};

export default SignUpPage;
