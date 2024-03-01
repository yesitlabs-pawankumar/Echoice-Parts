import Link from "next/link";
import Image from "next/image";
import CustomToastContainer from "../CustomToastContainer";

const Footer = () => {
  return (
    <>
      <section className="footer-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="about-footer">
                <Image
                  width={86}
                  height={85}
                  src="/images/logo-footer.png"
                  alt=""
                />
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet,
                  consectetuer adipiscing elit. Aenean commodo ligula eget
                  dolor.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="quick-links">
                <h5>Quick Links</h5>
                <ul>
                  <li>
                    <Link href={"/about"}> About </Link>
                  </li>
                  <li>
                    <Link href={"/contact"}> Contact </Link>
                  </li>
                  <li>
                    <Link href={"/terms-and-conditions"}>
                      {" "}
                      Terms & Conditions{" "}
                    </Link>
                  </li>
                  <li>
                    <Link href={"/privacy-policy"}> Privacy Policy </Link>
                  </li>
                  <li>
                    <Link href={"/how-it-works"}> How it Works </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="our-information">
                <div className="quick-links">
                  <h5>Our Information</h5>
                  <ul>
                    <li>
                      <Link href={"/events"}> Events </Link>
                    </li>
                    <li>
                      <Link href={"/voopons"}> Voopons </Link>
                    </li>
                    <li>
                      <Link href={"/businesses"}> Businesses </Link>
                    </li>
                    <li>
                      <Link href={"/promoters"}> Promoters </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="our-information">
                <div className="quick-links">
                  <h5> Our Socials </h5>
                  <ul>
                    <li>
                      <a href="#">
                        <Image
                          width={29}
                          height={29}
                          src="/images/facebook.png"
                          alt=""
                        />{" "}
                        Facebook{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Image
                          width={29}
                          height={29}
                          src="/images/instra.png"
                          alt=""
                        />{" "}
                        Instagram{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Image
                          width={29}
                          height={29}
                          src="/images/youtube.png"
                          alt=""
                        />{" "}
                        YouTube{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Image
                          width={29}
                          height={29}
                          src="/images/twitter.png"
                          alt=""
                        />{" "}
                        Twitter{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Image
                          width={29}
                          height={29}
                          src="/images/truth.png"
                          alt=""
                        />{" "}
                        Truth{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Image
                          width={29}
                          height={29}
                          src="/images/gettr.png"
                          alt=""
                        />{" "}
                        Gettr{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CustomToastContainer />
      <div className="copyright">Copyright ©2023. All Rights Reserved.</div>
    </>
  );
};

export default Footer;
