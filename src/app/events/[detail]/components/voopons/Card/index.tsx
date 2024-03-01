import Image from "next/image";

const Card = () => {
  return (
    <>
      <div className="item">
        <div className="voopan-box">
          <div className="voopon-logo"><Image width={125} height={125} src="/images/voopons-logo-1.png" alt="" /></div>
          <div className="voopon-heading">Flat 45% OFF </div>
          <h5>Lobster Dogs Food Truck</h5>
          <p>Valid Thru: Aug 15, 2023</p>
          <a className="btn btn-viewmore" href="#" role="button">View More</a>
        </div>
      </div>
    </>
  );
}

export default Card;