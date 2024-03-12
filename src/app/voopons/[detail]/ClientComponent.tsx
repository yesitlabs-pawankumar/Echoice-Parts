"use client";
import { useState } from "react";
import Image from "next/image";
import Events from "./components/events";
import AddCard from "./components/Modal/addCard";
import Collaborator from "./components/Modal/collaborator";
import Quantity from "@/components/Quantity";
import { DateTime } from "luxon";
import { BASE_URL } from "@/constant/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/UserProvider";
import { postDataWithAuth, postFetchDataWithAuth } from "@/fetchData/fetchApi";
import { toast } from "react-toastify";

const ClientComponent = ({ voopon_detail }) => {
  const [open, setOpen] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [voopansPrice, setVoopansPrice] = useState<number>(
    voopon_detail?.voopons_price || 0
  );
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated, userDetails } = useAuth();
  const router = useRouter();
  let pathName = usePathname();
  const searchParams = useSearchParams();
  const tempPathName =
    pathName + `?promoter_id=${searchParams.get("promoter_id")}`;
  const handleBookNow = () => {
    if (!isAuthenticated) {
      router.push(`/login?lastPath=${tempPathName}`);
    } else {
      setOpenCard(true);
    }
  };
  const handleQuantity = (qty: number) => {
    setQuantity(qty);
    setVoopansPrice(qty * voopon_detail?.voopons_price);
  };
  console.log("voopon_detail", voopon_detail, userDetails);
  const callBack = async (tok: any) => {
    if (tok.id) {
      const requestData = {
        user_id: `${userDetails?.user_id}`,
        email: userDetails?.email,
        price: `${voopansPrice}`,
        voopon_id: `${voopon_detail?.id}`,
        voopon_quantity: `${quantity}`,
        promoter_id: voopon_detail?.promoter_id,
        token: tok?.id,
        event_id: null,
        event_quantity: null,
      };
      try {
        const response = await postFetchDataWithAuth({
          data: requestData,
          endpoint: "user_buy_now",
          authToken: userDetails.token,
        });
        if (response.success) {
          toast.success(`Payment successful`);
        } else {
          throw response;
        }
      } catch (error) {
        console.log("e", error);
        toast.error(`${error}`);
      }
    }
  };
  return (
    <>
      <div className="col-lg-6">
        <div className="details-text-box">
          <h2 className="title-capitilize"> {voopon_detail?.voopons_name} </h2>
          <p>{voopon_detail?.voopons_description}</p>

          <div className="collaborators">
            <span>
              <Image
                width={31}
                height={31}
                src="/images/collabo-icon.png"
                alt="images"
                className="img-fluid"
              />
            </span>
            <span className="col-font" onClick={() => setOpen(true)}>
              Collaborator(s):
            </span>
            <span>
              {voopon_detail?.collaborator_data?.length > 0 &&
                voopon_detail?.collaborator_data.map((collaborator, idx) => {
                  if (idx < 3) {
                    return (
                      <Image
                        key={collaborator?.id}
                        width={31}
                        height={31}
                        src={
                          collaborator?.promoter_data?.profile_image
                            ? `${BASE_URL}/${collaborator?.promoter_data?.profile_image}`
                            : "/images/colebr-1.png"
                        }
                        alt="images"
                        className="collabeIcon"
                      />
                    );
                  }
                })}

              {voopon_detail?.collaborator_data?.length > 3 && (
                <div className="more">
                  {" "}
                  +{voopon_detail?.collaborator_data?.length - 3}{" "}
                </div>
              )}
            </span>
          </div>

          <Collaborator
            open={open}
            setOpen={setOpen}
            data={voopon_detail?.collaborator_data}
          />
          <AddCard open={openCard} setOpen={setOpenCard} callBack={callBack} />

          <div className="row mt-3">
            <div className="col-lg-8 col-md-8">
              <div className="location-box">
                <h4> Location </h4>
                <span> {voopon_detail?.location} </span>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="valid-thru">
                <h4> Valid Thru </h4>
                <span>
                  {" "}
                  {voopon_detail?.voopons_valid_thru &&
                    DateTime.fromFormat(
                      voopon_detail?.voopons_valid_thru,
                      "yyyy-MM-dd"
                    ).toFormat("MMM dd, yyyy")}
                </span>
              </div>
            </div>
          </div>
          <div className="row mt-2 align-items-center">
            <div className="col-lg-8 col-md-6">
              <div className="price-box">
                <h4>
                  {" "}
                  Price: <span> {voopansPrice} </span>
                </h4>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="quantity">
                <h4> Quantity:</h4>
                <Quantity
                  limit={Number(voopon_detail?.buyer_per_voopons || 1)}
                  updateQuantity={handleQuantity}
                />
              </div>
            </div>
          </div>
          <div className="row mt-2 align-items-center">
            <div className="col-lg-8 col-md-6">
              <a
                onClick={handleBookNow}
                className="btn btn-learnmore"
                href="#"
                role="button"
              >
                Buy Now
              </a>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="share-media">
                <span>
                  {" "}
                  <Image
                    width={24}
                    height={24}
                    src="/images/share.svg"
                    alt=""
                  />{" "}
                  Share with friends{" "}
                </span>
                <div className="show-social">
                  <span>
                    <Image
                      width={16}
                      height={17}
                      src="/images/social-icon-1.png"
                      alt="images"
                    />
                  </span>
                  <span>
                    <Image
                      width={16}
                      height={17}
                      src="/images/social-icon-2.png"
                      alt="images"
                    />
                  </span>
                  <span>
                    <Image
                      width={16}
                      height={17}
                      src="/images/social-icon-3.png"
                      alt="images"
                    />
                  </span>
                  <span>
                    <Image
                      width={16}
                      height={17}
                      src="/images/social-icon-4.png"
                      alt="images"
                    />
                  </span>
                  <span>
                    <Image
                      width={16}
                      height={17}
                      src="/images/social-icon-5.png"
                      alt="images"
                    />
                  </span>
                  <span>
                    <Image
                      width={16}
                      height={17}
                      src="/images/social-icon-6.png"
                      alt="images"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientComponent;
