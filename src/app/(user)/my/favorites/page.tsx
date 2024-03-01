import Image from "next/image";

const Favorites = () => {
  return (
    <>
      <div className="user-dashboard-data">
        <div className="user-my-favorites">
          <h1>My Favorites</h1>
        </div>
        <div className="user-my-favorites-inner">
          <div className="event-brand-box">
            <div className="brand-logo">
              <div className="brand-heart">
                <form>
                  <input type="checkbox" name="favorite" id="favorite" defaultChecked />
                  <label htmlFor="favorite">
                    <Image width={25} height={23} className="brand-logo-heart" src="/images/user-bookmark.png" alt="" />
                    <Image width={25} height={23} className="brand-logo-heart-fill" src="/images/user-bookmark-2.png" alt="" />
                  </label>
                </form>
              </div>
              <Image width={285} height={223} src="/images/near-event3.png" alt="" />
            </div>
            <div className="event-pad">
              <h6>AMF Latin Street Grill</h6>
              <p>An evening with inspirational vibes, curated for your enjoyment and listening pleasure.</p>
              <div className="point-icon">
                <span><Image width={20} height={20} src="/images/location-dot.png" alt="" /> 2.2 miles away </span>
                <span><Image width={20} height={20} src="/images/loc-mark.svg" alt="" /> 123 Main Sy Palo ALTO CA 90210, ay </span>
              </div>
              <a className="btn btn-viewmore-border" href="event-details.html" role="button">View More</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Favorites;