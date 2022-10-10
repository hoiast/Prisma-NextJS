import Link from "next/link";
import LinkedRoundedButton from "./LinkedRoundedButton";

type SectionTitleProps = {
    className?: string
    icon?: string
    title:string 
    href?: string
}


export default function SectionTitle({icon, title, href, className}:SectionTitleProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <h3 className="text-2xl">{title}</h3>
      {
        href && icon && 
        <LinkedRoundedButton
        href={href}
        icon={icon} 
        />
      }
    </div>
  );
}
