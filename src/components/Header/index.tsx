import Link from "next/link";
import Image from "next/image";
import ClientComponent from "./ClientComponent";

const Header = () => {
  return (
    <>
      <div className="top-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-0"></div>
            <div className="col-lg-6 col-md-6">
              <form className="d-flex top-srchbox">
                <input
                  className="top-srch"
                  type="search"
                  placeholder="Search for Voopons, Events, Promoters , Businesses..."
                  aria-label="Search"
                />
                <button className="srch-btn" type="submit">
                  <Image
                    width={15}
                    height={16}
                    src="/images/search.png"
                    alt=""
                  />
                </button>
              </form>
            </div>

            <ClientComponent />
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary top-nav">
        <div className="container navbar-gap">
          <Link className="navbar-brand" href={"/"}>
            <Image width={274} height={60} src="/images/logo.png" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse right-menu"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav  mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link className="nav-link" href={"/about"}>
                  {" "}
                  About{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/voopons"}>
                  {" "}
                  Voopons{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/events"}>
                  {" "}
                  Events{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/businesses"}>
                  {" "}
                  Businesses{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/promoters"}>
                  {" "}
                  Promoters{" "}
                </Link>
              </li>
              <li className="nav-item joinbox">
                <Link
                  className="nav-link joinbtn-inner"
                  href={"/business-promoter"}
                >
                  {" "}
                  Join as Business/Promoter{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
