"use client";
import { useState } from "react";
import { useRef } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";

import Dialog from "./components/success";
import useLocalStorage, { removeStorage } from "@/constant/useLocalStorage";
import { postData, postDataWithAuth } from "@/fetchData/fetchApi";
import { toast } from "react-toastify";

const AccountVerificaton = () => {
  const [open, setOpen] = useState(false);
  const [localStorage, setLocalStorage] = useLocalStorage<any>(
    "signupUser",
    null
  );
  const formElement = useRef<HTMLFormElement>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: [{ code: "" }, { code: "" }, { code: "" }, { code: "" }],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "otp",
  });

  const onSubmit = async (data: any) => {
    const tempOTP = data.otp.map((obj) => obj.code).join("");
    if (tempOTP !== "") {
      try {
        const formdata = {
          email: localStorage.email,
          otp: tempOTP,
        };
        const response = await postDataWithAuth({
          data: formdata,
          endpoint: "auth/user_otp_verify",
          authToken: localStorage.token,
        });
        console.log("resp", response);
        if (response.user_id) {
          await removeStorage("signupUser");
          setOpen(true);
        } else {
          throw response;
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    }
  };
  const requestResend = async () => {
    try {
      const formdata = {
        name: localStorage.name,
        email: localStorage.email,
        password: localStorage.password,
      };
      const response = await postData({
        data: formdata,
        endpoint: "user_signup",
      });
      if (response.token && response.email) {
        toast.success(`OTP send successfully`);
      } else {
        throw response;
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <>
      <section className="login-signup-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12 p-lg-5">
              <div className="login-sign-box">
                <div className="login-sign-left otp-verification">
                  <div className="sign-logo">
                    <Image
                      width={153}
                      height={150}
                      src="/images/login-logo.png"
                      alt="images"
                      className="img-fluid"
                    />
                  </div>
                  <h3 className="mt-3">Find Your A-ha!</h3>
                  <p>
                    VOOLAY-VOO Social Marketing™ allows Promoters to actively
                    and timely engage consumers by utilizing their social media
                    influence and presence to curate, create, manage, publish,
                    and share events, promotions, and campaigns and attuning it
                    to the needs of interested consumers exactly when they have
                    a need, interest, or are in the buying mood.
                  </p>
                </div>
                <div className="login-sign-right text-center align-self-center">
                  <div className="formbox">
                    <div className="tab-content" id="pills-tabContent">
                      <div className="same-inner-tab" id="">
                        <h1 className="mb-5">Verification Code </h1>
                        <p>
                          Please enter the 4-digit verification code sent to
                          your email/phone.
                        </p>
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          ref={formElement}
                        >
                          <div className="otp-verification-input">
                            {fields.map((item, index) => {
                              return (
                                <input
                                  {...register(`otp.${index}.code`, {
                                    required: true,
                                    pattern: /[0-9]/,
                                  })}
                                  maxLength={1}
                                  key={item.id}
                                  className="inputs"
                                />
                              );
                            })}
                          </div>
                          <a
                            onClick={() => formElement.current?.requestSubmit()}
                            className="btn btn-learnmore"
                          >
                            NEXT{" "}
                          </a>
                        </form>
                        <div className="resend">
                          <a onClick={() => requestResend()}>Resend</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={open} />
    </>
  );
};

export default AccountVerificaton;
