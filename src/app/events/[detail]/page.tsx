"use server";

import ClientComponent from "./ClientComponent";
import { BASE_URL } from "@/constant/constant";
import { getFormData } from "@/fetchData/fetchApi";

async function getData(detail: number, promoter_id: number) {
  const resEvent = await fetch(`${BASE_URL}/api/user_event_detail_list`, {
    method: "POST",
    body: getFormData({ event_id: detail, promoter_id }),
  });
  const eventDetails = await resEvent.json();
  const resRelatedVoopon = await fetch(
    `${BASE_URL}/api/user_voopon_list_related_event`,
    {
      method: "POST",
      body: getFormData({ event_id: detail, promoter_id }),
    }
  );
  const relatedVoopon = await resRelatedVoopon.json();

  return {
    event_detail: eventDetails.data,
    related_voopon: relatedVoopon?.data,
  };
}

const Detail = async ({
  params: { detail },
  searchParams: { promoter_id },
}: {
  params: { detail: number };
  searchParams: { promoter_id: number };
}) => {
  const { event_detail, related_voopon } = await getData(detail, promoter_id);

  return (
    <ClientComponent
      eventDetail={event_detail}
      relatedVoopon={related_voopon}
    />
  );
};

export default Detail;
