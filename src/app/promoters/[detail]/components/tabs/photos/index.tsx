import { BASE_URL } from "@/constant/constant";
import Image from "next/image";

const Photos = ({ dataList }): any => {
  return (
    <>
      <div
        className="tab-pane fade"
        id="photos"
        role="tabpanel"
        aria-labelledby="photos-tab"
      >
        {Array.isArray(dataList) && dataList.length > 0 && (
          <div className="gallery-box">
            {Array.isArray(dataList) &&
              dataList.length > 0 &&
              dataList.map((item) => (
                <div key={item.id} className="gallery-img-video">
                  <img
                    src={
                      item?.image_name
                        ? `${BASE_URL}/${item?.image_name}`
                        : "../images/video/gallery-1.png"
                    }
                    alt=""
                  />
                </div>
              ))}
          </div>
        )}
        <div className="row">
          {Array.isArray(dataList) && dataList.length === 0 && (
            <p className="noDataText">No Photos</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
