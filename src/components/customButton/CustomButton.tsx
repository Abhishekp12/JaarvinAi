import React from 'react';
import { Button, ButtonProps } from '@mui/material';

// Define the interface for the props, extending MUI ButtonProps
interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode; // Use React.ReactNode for children
  onClick?: (event: React.MouseEvent<HTMLElement>) => void; // onClick function
}

// Define the CustomButton component
const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick = () => {}, // Default empty function
  variant = "contained", // Default variant
  size = "medium", // Default size
  color = "primary", // Default color
  sx = {}, //  sx as a prop
  ...rest // Collect other props like sx
}) => {                             
  return (
    <Button
      onClick={onClick}
      variant={variant} // Correct prop name
      size={size} // Correct prop name
      color={color} // Correct prop name
      sx = {sx} // Add sx as a prop
      {...rest} // Spread other props
    >
      {children} {/* Render children */}
    </Button>
  );
};

export default CustomButton;
