import Image from "next/image";

const Card = () => {
  return (
    <>
      <div className="user-rating-box">
        <div className="comment-time">32 minutes ago</div>
        <div className="rating-user">
          <img src="../images/rating-person-1.png" alt="" />
        </div>
        <div className="rating-and-comment">
          <div className="rating-person">Haylie Aminoff</div>
          <div className="rating-box-com">
            4.5
            <span>
              <img src="../images/user-rating.png" alt="" />
            </span>
            <span>
              <img src="../images/user-rating.png" alt="" />
            </span>
            <span>
              <img src="../images/user-rating.png" alt="" />
            </span>
            <span>
              <img src="../images/user-rating.png" alt="" />
            </span>
            <span>
              <img src="../images/user-rating.png" alt="" />
            </span>
          </div>
          <div className="rating-comment">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
