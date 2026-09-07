import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function ProductContainer({ children, ...rest }: Props) {
  return (
    <div
      {...rest}
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 px-4"
    >
      {children}
    </div>
  );
}