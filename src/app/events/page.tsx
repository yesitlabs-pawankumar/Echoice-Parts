"use server";

import ClientComponent from "./ClientComponent";
import { BASE_URL } from "@/constant/constant";
import { countCategory, filterEvent } from "@/relatedFunction/eventFunction";
async function getData() {
  const resCategory = await fetch(`${BASE_URL}/api/user_category_list`, {
    method: "POST",
    // body: "none",
  });

  const resEventList = await fetch(`${BASE_URL}/api/user_event_list`, {
    method: "POST",
    body: "none",
  });
  const resultCat = await resCategory.json();
  const resultEvent = await resEventList.json();

  if (!resCategory.ok) {
    throw new Error("Failed to fetch data");
  }

  return {
    categoryList: countCategory(resultCat.data, resultEvent.data),
    eventList: filterEvent(resultEvent.data, resultCat.data),
  };
}

const Events = async () => {
  const { categoryList, eventList } = await getData();

  return <ClientComponent categoryList={categoryList} eventList={eventList} />;
};

export default Events;
