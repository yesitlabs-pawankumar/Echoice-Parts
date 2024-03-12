"use client";

import { postData } from "@/fetchData/fetchApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SubscribeHome = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    try {
      const response = await postData({
        data: data,
        endpoint: "user_subscribe_voolayvoo",
      });
      if (response.user_email) {
        toast.success(`You have Subscribe to our news letter`);
      } else {
        throw response;
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center heading">
          <span> Get latest updates from VoolayVoo? </span>
        </div>
        <div className="col-lg-6">
          <form
            className="d-flex sub-srchbox mt-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("user_email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              className="suscribe-srch"
              type="mail"
              placeholder="Enter your Email"
            />
            <button className="subscribe-btn" type="submit">
              {" "}
              Subscribe{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SubscribeHome;
