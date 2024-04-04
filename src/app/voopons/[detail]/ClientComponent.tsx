"use client";
import { useState } from "react";
import Image from "next/image";
import Collaborator from "./components/Modal/collaborator";
import Quantity from "@/components/Quantity";
import { DateTime } from "luxon";
import { BASE_URL } from "@/constant/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/UserProvider";
import { postFetchDataWithAuth } from "@/fetchData/fetchApi";
import { toast } from "react-toastify";
import CheckPayment from "../../../components/Modal/CheckPayment";

const ClientComponent = ({ voopon_detail }) => {
  const [open, setOpen] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [voopansPrice, setVoopansPrice] = useState<number>(
    voopon_detail?.voopons_price || 0
  );
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated, userDetails } = useAuth();
  const [reload, setReload] = useState<boolean>(false);
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
  // const generateQRCode = async () => {
  //   try {
  //     const requestData = {
  //       user_id: userDetails?.user_id,
  //       promoter_voopon_id: voopon_detail?.id,
  //       // business_event_id: eventDetail,
  //       price: voopansPrice,
  //       voopon_id: voopon_detail?.id,
  //       voopon_quantity: quantity,
  //       promoter_id: voopon_detail?.promoter_id,
  //     };
  //     const response = await postData({
  //       data: requestData,
  //       endpoint: "qrcode_generate_Save_test",
  //     });
  //     if (response.id) {
  //       toast.success(`QR code generated`);
  //     }
  //   } catch (error) {
  //     toast.error(`${error}`);
  //   }
  // };
  const callBack = async (card: any) => {
    console.log("card", card);
    let requestData: any;
    if (card?.token) {
      requestData = {
        user_id: `${userDetails?.user_id}`,
        email: userDetails?.email,
        price: `${voopansPrice}`,
        promoter_voopon_id: `${voopon_detail?.id}`,
        voopon_quantity: `${quantity}`,
        promoter_id: voopon_detail?.promoter_id,
        token: card?.token,
        // event_id: null,
        // event_quantity: null,
      };
    } else if (card?.customer_id) {
      requestData = {
        user_id: `${userDetails?.user_id}`,
        email: userDetails?.email,
        price: `${voopansPrice}`,
        promoter_voopon_id: `${voopon_detail?.id}`,
        voopon_quantity: `${quantity}`,
        promoter_id: voopon_detail?.promoter_id,
        customer_id: card?.customer_id,
        // event_id: null,
        // event_quantity: null,
      };
    }
    try {
      const response = await postFetchDataWithAuth({
        data: requestData,
        endpoint: "user_buy_now",
        authToken: userDetails.token,
      });
      if (response.success) {
        setReload(!reload);
        toast.success(`Payment successful`);
      } else {
        throw response;
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
          <CheckPayment
            open={openCard}
            setOpen={setOpenCard}
            callBack={callBack}
            reloadList={reload}
          />

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
                      width={24}
                      height={24}
                      src="/images/social-icon-1.svg"
                      alt="images"
                    />
                  </span>
                  <span>
                    <Image
                      width={24}
                      height={24}
                      src="/images/social-icon-2.svg"
                      alt="images"
                    />
                  </span>
                  <span>
                    <Image
                      width={24}
                      height={24}
                      src="/images/social-icon-3.svg"
                      alt="images"
                    />
                  </span>
                  <span>
                    <Image
                      width={24}
                      height={24}
                      src="/images/social-icon-4.svg"
                      alt="images"
                    />
                  </span>
                  <span>
                    <Image
                      width={24}
                      height={24}
                      src="/images/social-icon-5.svg"
                      alt="images"
                    />
                  </span>
                  <span>
                    <Image
                      width={24}
                      height={24}
                      src="/images/social-icon-6.svg"
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
