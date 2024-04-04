"use client";

import { useAuth } from "@/app/UserProvider";
import ClientComponent from "./ClientComponent";
import { postData, postFetchDataWithAuth } from "@/fetchData/fetchApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "@/constant/constant";

// async function getData(detail: number, promoter_id: number) {
//   console.log(detail);
//   const resEvent = await fetch(`${BASE_URL}/api/user_event_detail_list`, {
//     method: "POST",
//     body: getFormData({ event_id: detail, promoter_id }),
//   });
//   const eventDetails = await resEvent.json();

//   return {
//     event_detail: eventDetails.data,
//   };
// }

const EventDetail = ({
  params: { detail },
  searchParams: { promoter_id },
}: {
  params: { detail: number };
  searchParams: { promoter_id: number };
}) => {
  const [eventDetail, setEventDetail] = useState<any>({});
  const [qrCode, setQrCode] = useState<any>({});
  const { isAuthenticated, userDetails } = useAuth();
  useEffect(() => {
    if (promoter_id && detail && isAuthenticated) {
      fetchEventDetail();
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
  const fetchEventDetail = async () => {
    try {
      const resultEvent = await postFetchDataWithAuth({
        data: { user_id: userDetails?.user_id },
        endpoint: "user_my_event_list",
        authToken: userDetails?.token,
      });

      if (Array.isArray(resultEvent?.data)) {
        const templist = resultEvent.data.find(
          (item: any) => Number(item?.promoter_event_id) === Number(detail)
        );
        const resEvent = await postData({
          data: { event_id: detail, promoter_id },
          endpoint: "user_event_detail_list",
        });
        if (resEvent?.id) {
          setEventDetail({
            ...resEvent,
            event_quantity: templist?.event_quantity,
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
  return <ClientComponent eventDetail={eventDetail} qrCode={qrCode} />;
};

export default EventDetail;
