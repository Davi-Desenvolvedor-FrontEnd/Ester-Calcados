import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement>  {
  children?: React.ReactNode;
};

export default function ProductContainer({ children, ...rest }: Props) {
  return (
    <div {...rest} >
      {children}
    </div>
  );
}