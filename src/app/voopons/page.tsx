import ClientComponent from "./ClientComponent";
import { countCategory, filterEvent } from "@/relatedFunction/eventFunction";
import { BASE_URL } from "@/constant/constant";

async function getData() {
  const resCategory = await fetch(`${BASE_URL}/api/user_category_list`, {
    method: "POST",
  });

  const resVoopanList = await fetch(`${BASE_URL}/api/user_voopon_list`, {
    method: "POST",
  });
  const resultCat = await resCategory.json();
  const resultEvent = await resVoopanList.json();
  const templist = resultEvent.data.map((item) => ({
    ...item,
    category_id: item?.event_data?.category_id,
    subcategory_id: item?.event_data?.subcategory_id,
  }));

  if (!resCategory.ok) {
    throw new Error("Failed to fetch data");
  }

  return {
    categoryList: countCategory(resultCat.data, templist),
    voopanList: filterEvent(templist, resultCat.data),
  };
}

const Voopons = async () => {
  const { categoryList, voopanList } = await getData();

  return (
    <>
      <div
        className="inner-banner"
        style={{
          backgroundImage: "url(/images/about-bnr.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1> Explore Voopons </h1>
        <p>Find Your A-ha!</p>
      </div>
      <ClientComponent categoryList={categoryList} voopanList={voopanList} />
    </>
  );
};

export default Voopons;
