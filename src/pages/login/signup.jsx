import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useState } from 'react';

const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

const SignUp = () => {
  const [activeStep, setActivateStep] = useState(0)
  return (
    <Box className='container m-auto'>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default SignUp;
