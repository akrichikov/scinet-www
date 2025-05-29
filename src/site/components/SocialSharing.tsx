import Link from "next/link";

export type SocialMediaLink = {
  href: string;
  ariaLabel: string;
  src: string;
  alt: string;
};

export type SocialSharingProps = {
  links: SocialMediaLink[];
};

const SocialSharing = ({ links }: SocialSharingProps) => {
  return (
    <div className="flex gap-3">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          aria-label={link.ariaLabel}
          target="_blank"
        >
          <img className="h-full w-fit" src={link.src} alt={link.alt} />
        </Link>
      ))}
    </div>
  );
};

export default SocialSharing;
