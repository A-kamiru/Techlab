import { Link, type LinkProps } from 'react-router-dom';

/** "#section" -> "/#section" so header/footer links also work from detail pages. */
export default function AnchorLink({ href, ...props }: Omit<LinkProps, 'to'> & { href: string }) {
  return <Link to={href.startsWith('#') ? { pathname: '/', hash: href } : href} {...props} />;
}
