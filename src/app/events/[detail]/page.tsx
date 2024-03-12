"use server";

import ClientComponent from "./ClientComponent";
import { BASE_URL } from "@/constant/constant";
import { getFormData } from "@/fetchData/fetchApi";

async function getData(detail: number, promoter_id: number) {
  console.log(detail);
  const resEvent = await fetch(`${BASE_URL}/api/user_event_detail_list`, {
    method: "POST",
    body: getFormData({ event_id: detail, promoter_id }),
  });
  const eventDetails = await resEvent.json();

  return {
    event_detail: eventDetails.data,
  };
}

const Detail = async ({
  params: { detail },
  searchParams: { promoter_id },
}: {
  params: { detail: number };
  searchParams: { promoter_id: number };
}) => {
  const { event_detail } = await getData(detail, promoter_id);

  return <ClientComponent eventDetail={event_detail} />;
};

export default Detail;
