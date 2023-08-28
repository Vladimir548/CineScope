import React from 'react';
import style from './style.module.css'
interface IBoxProps {
    children:React.ReactNode
    className?:string
}

export const Box:React.FC<IBoxProps> = ({children,className}) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};