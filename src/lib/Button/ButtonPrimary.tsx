import React from 'react';
import Button, { ButtonProps } from './Button';



export interface ButtonPrimaryProps extends ButtonProps {
  href?: any;
  textClassName?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = '',
  textClassName = '',
  ...args
}) => {
  return (
    <Button
      className={`disabled:bg-opacity/70 rounded-full bg-baseGreen ${
        textClassName || 'text-white'
      } hover:bg-baseGreen/80 hover:text-white ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
