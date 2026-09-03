import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function ProductContainer({ children, ...rest }: Props) {
  return (
    <div
      {...rest}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full px-4"
    >
      {children}
    </div>
  );
}
