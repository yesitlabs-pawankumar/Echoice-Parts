"use server";
import Image from "next/image";
import Events from "./components/events";
import ClientComponent from "./ClientComponent";
import { BASE_URL } from "@/constant/constant";
import { getFormData } from "@/fetchData/fetchApi";

async function getData(detail, promoter_id) {
  const resVoopon = await fetch(`${BASE_URL}/api/user_voopon_detail_list`, {
    method: "POST",
    body: getFormData({ voopon_id: detail, promoter_id }),
  });
  const vooponDetails = await resVoopon.json();

  return {
    voopon_detail: vooponDetails.data,
  };
}

const Detail = async ({
  params: { detail },
  searchParams: { promoter_id },
}: {
  params: { detail: number };
  searchParams: { promoter_id: number };
}) => {
  const { voopon_detail } = await getData(detail, promoter_id);

  return (
    <>
      <section className="details-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="details-img" style={{ width: 596, height: 375 }}>
                <Image
                  width={596}
                  height={375}
                  src={
                    voopon_detail?.vooponsimage[0]?.image_name
                      ? `${BASE_URL}/${voopon_detail?.vooponsimage[0]?.image_name}`
                      : "/images/amf-details.png"
                  }
                  alt="images"
                  className="img-voopon"
                />
              </div>
            </div>
            <ClientComponent voopon_detail={voopon_detail} />
          </div>
        </div>
      </section>

      <section className="about-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-sec">About this Voopons</div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the Lorem has been the industry&apos;s
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions.
              </p>
              <div className="heading-sec">Voopons Details</div>
              <ul>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.
                </li>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.Lorem Ipsum is{" "}
                </li>
                <li>
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry&apos;s standard dummy text.
                </li>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.
                </li>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.
                </li>
              </ul>
              <div className="heading-sec">Terms & Conditions</div>
              <ul>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.
                </li>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.Lorem Ipsum is{" "}
                </li>
                <li>
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry&apos;s standard dummy text.
                </li>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.
                </li>
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Events />
    </>
  );
};

export default Detail;
