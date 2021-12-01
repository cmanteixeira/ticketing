import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { lable: "Sign Up", href: "/auth/signup" },
    !currentUser && { lable: "Sign In", href: "/auth/signin" },
    currentUser && { lable: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ lable, href }) => {
      return (
        <li key="href" className="nav-item">
          <Link href={href}>
            <a className="nav-link">{lable}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">SuperFixe</a>
        </Link>
        <div className="d-flex justify-content-end">
          <ul className="nav d-flex align-items-center">{links}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
