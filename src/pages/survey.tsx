import React from "react";
import { useForm, Controller } from "react-hook-form";
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
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h2`
  color: #0b894a;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f3f3fb;
`;

const Select = styled.select`
  ${Input}
`;

const TextArea = styled.textarea`
  width: 100%; /* Full width matching Input */
  padding: 10px; /* Same padding as Input */
  border: 1px solid #ccc; /* Same border as Input */
  border-radius: 5px; /* Same border-radius as Input */
  margin-bottom: 10px; /* Same margin-bottom as Input */
  background-color: #f3f3fb; /* Same background-color as Input */
  min-height: 150px; /* Increase minimum height for better usability */
  resize: vertical; /* Allow resizing vertically only */
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #333;

  input {
    margin-right: 10px;
  }
`;

const RadioLabel = styled(CheckboxLabel)``;

const SubmitButton = styled.button`
  background-color: #0b894a;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #0a7a42;
  }
`;

type FormValues = {
  homeSize: string;
  address: string;
  region: { state: string; city: string };
  familyMembers: number;
  childrenBelow18: number;
  dailyLifestyle: string;
  ecoMotivations: string[];
  futureGoals: string;
  adviceTools: string;
};

const SurveyForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      region: { state: "", city: "" },
      ecoMotivations: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    navigate("/home");
  };

  const homeSizeOptions = ["1BHK", "2BHK", "3BHK", "4+ BHK"];
  const dailyLifestyleOptions = [
    "Very eco-conscious",
    "Moderately eco-conscious",
    "Limited awareness",
    "Not eco-conscious",
  ];

  return (
    <Container>
      <FormWrapper>
        <Title>Household Survey Form</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>Home Size</Label>
          <Select {...register("homeSize")}>
            {homeSizeOptions.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </Select>

          <Label>Address</Label>
          <Input {...register("address")} placeholder="Enter your address" />

          <Label>State</Label>
          <Input {...register("region.state")} placeholder="Enter state" />

          <Label>City</Label>
          <Input {...register("region.city")} placeholder="Enter city" />

          <Label>Number of Family Members</Label>
          <Input
            type="number"
            {...register("familyMembers")}
            placeholder="Enter number"
          />

          <Label>Number of Children Below 18</Label>
          <Input
            type="number"
            {...register("childrenBelow18")}
            placeholder="Enter number"
          />

          <Label>Daily Lifestyle</Label>
          {dailyLifestyleOptions.map((option, index) => (
            <RadioLabel key={index}>
              <input
                type="radio"
                value={option}
                {...register("dailyLifestyle")}
              />
              {option}
            </RadioLabel>
          ))}

          <Label>Eco Motivations</Label>
          <Controller
            name="ecoMotivations"
            control={control}
            render={({ field }) => (
              <>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    value="Better planet"
                    title="Better planet"
                    onChange={(e) => {
                      const value = e.target.value;
                      const checked = e.target.checked;
                      field.onChange(
                        checked
                          ? [...field.value, value]
                          : field.value.filter((v) => v !== value)
                      );
                    }}
                    checked={field.value.includes("Better planet")}
                  />
                  A desire to contribute to a better planet
                </CheckboxLabel>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    value="Cost savings"
                    title="Cost savings"
                    onChange={(e) => {
                      const value = e.target.value;
                      const checked = e.target.checked;
                      field.onChange(
                        checked
                          ? [...field.value, value]
                          : field.value.filter((v) => v !== value)
                      );
                    }}
                  />
                  Long-term cost savings
                </CheckboxLabel>
              </>
            )}
          />

          <Label>Future Goals</Label>
          <TextArea
            {...register("futureGoals")}
            placeholder="Describe your top sustainable goals"
          />

          <Label>Advice & Tools</Label>
          <TextArea
            {...register("adviceTools")}
            placeholder="What tools or advice would help?"
          />

          <SubmitButton type="submit">Submit</SubmitButton>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default SurveyForm;
