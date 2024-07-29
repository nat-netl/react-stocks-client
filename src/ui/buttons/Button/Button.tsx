import React from 'react'
import s from './button.module.scss'

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  children?: React.ReactNode;
  disabled?: boolean; 
  className?: string
  color?: string
};

const Button = ({color, onClick, children, ...attributes}: ButtonProps) => {
  return <button style={{backgroundColor: color}} onClick={onClick} className={s.btn} name="button" {...attributes}>{children}</button>;
}

export default Button

