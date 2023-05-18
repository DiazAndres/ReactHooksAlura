import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { LogoSpace, MainSpace, FormSpace, Img } from "./styles";
import DatosUsuario from "./DatosUsuario";
import DatosPersonales from "./DatosPersonales";
import DatosEntrega from "./DatosEntrega";
import Complete from "./Complete";
import Stepper from "../Stepper";

// Validaciones
import { validarEmail, validarPassword } from "./DatosUsuario/validaciones";
import Step from "./Step";

const Form = () => {
  const [step, setStep] = useState(0);
  // step = 0 --> <DatosUsuario />
  // step = 1 --> <DatosPersonales />
  // step = 2 --> <DatosEntrega />
  // step = 3 --> <Complete />
  const [pasos, setPasos] = useState({});


  useEffect(() => {
    console.log("UseEffect");
  });

  useEffect(() => {
    console.log("Se ha actualizado el step:", step);
  }, [step]);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  //       const posts = await data.json();
  //       console.log(posts);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   getData();
  // });

  const updateStep = (step) => {
    console.log('actualizar paso', step);
    setStep(step);
  }

  const steps = {
    0: <DatosUsuario updateStep={updateStep} />,
    1: <DatosPersonales updateStep={updateStep} />,
    2: <DatosEntrega updateStep={updateStep} />,
    3: <Complete />,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let newStep = step + 1;
    setStep(newStep);
    console.log("new", newStep);
    console.log(step);
  }

  const handleChange = (element, position, currentStep, validator) => {
    const value = element.target.value;
    const valid = validator(value);
    console.log(valid);
    console.log(value);
    console.log('position', position);
  }

  const stepsFlow = {
    0: {
      inputs: [
        {
          label: "Correo electrónico",
          type: "email",
          value: "",
          valid: null,
          onChange: handleChange,
          helperText: "Ingresar un correo válido.",
          validator: validarEmail
        },
        {
          label: "Contraseña",
          type: "password",
          value: "",
          valid: null,
          onChange: handleChange,
          helperText: "Ingrese una contraseña válida, al menos 8 caracteres y máximo 20.",
          validator: validarPassword

        },
      ],
      buttonText: "Siguiente",
      onSubmit
    }
  }

  return (
    <Box
      sx={{
        padding: "30px",
        display: "flexbox",
        flexDirection: "column",
      }}
    >
      <LogoSpace>
        <Img src={"/favicon.png"} />
        <Typography variant="h3">AluraFood</Typography>
      </LogoSpace>
      <FormSpace>
        {(step < 3) && <Stepper step={step} />}
        {/* {steps[step]} */}
        <Step data={stepsFlow[step]} step={step} />
      </FormSpace>
    </Box>
  );
};

export default Form;
