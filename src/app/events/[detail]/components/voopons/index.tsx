import Card from "./Card";

const Voopons = () => {
  return (
    <>
      <section className="related-voopons mt-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading mb-3">
                <span> Related Voopons</span>{" "}
              </div>
            </div>
            <div className="col-lg-12">
              <div id="voopons-slider" className="owl-carousel">
                <Card />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Voopons;
