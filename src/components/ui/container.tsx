import * as React from "react";

export type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="container 2xl mx-auto w-full">{children}</div>;
};

export { Container };