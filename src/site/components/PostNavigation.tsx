import Link from "next/link";

export type PostNavigationProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

const PostNavigation = ({ children, href }: PostNavigationProps) => {
  return (
    <div className="flex items-center justify-between py-4 md:pt-8 md:pb-24">
      <Link
        className="flex items-center gap-2 uppercase font-semibold w-full"
        href={href}
      >
        <img
          className="rotate-180"
          src="/icons/ri_arrow-right-line.svg"
          alt="Right arrow"
        />
        Go Back
      </Link>
      <p className="uppercase font-semibold text-lg md:text-[2rem]">
        {children}
      </p>
    </div>
  );
};

export default PostNavigation;
