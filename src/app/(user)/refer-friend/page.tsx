import Image from "next/image";

const ReferFriend = () => {
  return (
    <>
      <div className="user-dashboard-data">
        <div className="user-my-favorites">
          <h1>Refer a Friend</h1>
        </div>
        <div className="user-refer-wrap">
          <div className="user-refer-inner">
            <h1>How it works</h1>
            <ul>
              <li>Invite your friends, just share your link to download the App.</li>
              <li>Earn Voopons.</li>
              <li>Congratulations! Voopon is on its way.</li>
              <li>Lorem Ipsum is simply dummy text.</li>
              <li>Lorem Ipsum is simply dummy text.</li>
              <li>Lorem Ipsum is simply dummy text.</li>
            </ul>
            <h1>Points Earned</h1>
            <p>545/2000</p>
            <meter id="disk_d" value="0.5">50%</meter>
            <p><span>You&apos;re only 1290 points away from receiving an amazing voopon.</span></p>
            <p>Points expire 12 months after your most recent <br /> transaction on 04/08/2024.</p>
          </div>
          <div className="user-refer-right">
            <Image width={321} height={308} src="/images/user-dashboard/refer-friend/side-image.svg" alt="" />
          </div>
          <div className="user-refer-btn">
            <a href="#"><Image width={15} height={16} src="/images/user-dashboard/refer-friend/file-upload.svg"
              alt="" />Refer Friend</a>
            <a href="#"><Image width={20} height={23} src="/images/user-dashboard/refer-friend/copy.svg" alt="" /></a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReferFriend;