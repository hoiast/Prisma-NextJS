import { ReactNode } from "react";

type RoundedButtonProps = {
    icon: string
    onClick?: ()=>void
}

export default function RoundedButton ({icon, onClick}: RoundedButtonProps) {
  return (
    <a className="rounded-button-teal" onClick={onClick}>
      <i className="material-icons">{icon}</i>
    </a>
  );
};
