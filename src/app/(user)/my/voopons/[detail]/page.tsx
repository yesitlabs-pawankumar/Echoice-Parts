"use client";

import { useAuth } from "@/app/UserProvider";
import ClientComponent from "./ClientComponent";
import { postData, postFetchDataWithAuth } from "@/fetchData/fetchApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { BASE_URL } from "@/constant/constant";
import Events from "@/app/voopons/[detail]/components/events";

const VooponDetail = ({
  params: { detail },
  searchParams: { promoter_id },
}: {
  params: { detail: number };
  searchParams: { promoter_id: number };
}) => {
  const [vooponDetail, setVooponDetail] = useState<any>({});
  const [relatedEvent, setRelatedEvent] = useState<any>({});
  const [qrCode, setQrCode] = useState<any>({});
  const { isAuthenticated, userDetails } = useAuth();
  useEffect(() => {
    if (promoter_id && detail && isAuthenticated) {
      fetchEventDetail();
      fetchRelatedEvent();
    }
  }, [detail, promoter_id, isAuthenticated]);
  const generateQRCode = async (matchNumber: string) => {
    try {
      const response = await postFetchDataWithAuth({
        data: { user_id: userDetails?.user_id, match_number: matchNumber },
        endpoint: "user_qr_code_get",
        authToken: userDetails?.token,
      });

      if (response?.success) {
        setQrCode(response?.data?.[0]);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  const fetchRelatedEvent = async () => {
    try {
      const resVoopon = await postData({
        data: { voopon_id: detail, promoter_id },
        endpoint: "user_event_list_related_voopon",
      });

      if (resVoopon?.[0]?.id) {
        setRelatedEvent(resVoopon?.[0]?.event_related_list);
      } else {
        throw resVoopon;
      }
    } catch (error: any) {
      const errorMessage =
        typeof error === "string"
          ? `${error}`
          : error?.message
          ? error?.message
          : `${error}`;
      toast.error(errorMessage);
    }
  };
  const fetchEventDetail = async () => {
    try {
      const resultEvent = await postFetchDataWithAuth({
        data: { user_id: userDetails?.user_id },
        endpoint: "user_my_voopon_list",
        authToken: userDetails?.token,
      });

      if (Array.isArray(resultEvent?.data)) {
        const templist = resultEvent.data.find(
          (item: any) => Number(item?.promoter_voopon_id) === Number(detail)
        );
        const resVoopon = await postData({
          data: { voopon_id: detail, promoter_id },
          endpoint: "user_voopon_detail_list",
        });
        if (resVoopon?.id) {
          setVooponDetail({
            ...resVoopon,
            voopon_quantity: templist?.voopon_quantity,
          });
        }
        generateQRCode(templist?.match_number);
      } else {
        throw resultEvent;
      }
    } catch (error: any) {
      const errorMessage =
        typeof error === "string"
          ? `${error}`
          : error?.message
          ? error?.message
          : `${error}`;
      toast.error(errorMessage);
    }
  };
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
                    vooponDetail?.vooponsimage?.[0]?.image_name
                      ? `${BASE_URL}/${vooponDetail?.vooponsimage?.[0]?.image_name}`
                      : "/images/amf-details.png"
                  }
                  alt="images"
                  className="img-voopon"
                />
              </div>
            </div>
            <ClientComponent vooponDetail={vooponDetail} qrCode={qrCode} />
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

      {relatedEvent?.id && <Events related_event={relatedEvent} />}
    </>
  );
};

export default VooponDetail;
