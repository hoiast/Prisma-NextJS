import Link from "next/link";
import RoundedButton from "./RoundedButton";

type LinkedRoundedButtonProps = {
    href: string;
    icon: string
    onClick?: ()=>void
}

export default function LinkedRoundedButton ({href, icon, onClick}: LinkedRoundedButtonProps) {
  return (
    <Link href={href}>
      <RoundedButton icon={icon} />
  </Link>
  );
};
