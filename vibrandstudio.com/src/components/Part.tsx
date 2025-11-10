import type { ReactNode } from "react";

type PartProps = {
  title: string;
  text?: string | ReactNode;
  children?: ReactNode;
};

function Part({ title, text, children }: PartProps) {
  return (
    <section>
      <h1>{title}</h1>
      {text}
      {children}
    </section>
  );
}

export { Part };
