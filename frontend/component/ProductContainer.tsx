import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function ProductContainer({ children }: Props) {
  return (
    <div className="flex flex-wrap gap-4 p-8 justify-center mt-16">
      {children}
    </div>
  );
}