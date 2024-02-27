import { ReactNode } from 'react';

type buttonProps = {
  children: ReactNode;
  textOnly?: boolean;
  className?: string;
  onClick?: () => void;
  typeProp?: any;
};

export function Button({
  children,
  textOnly,
  className,
  typeProp,
  ...props
}: buttonProps) {
  let cssClasses = textOnly ? 'text-button' : 'button';
  cssClasses += ' ' + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
