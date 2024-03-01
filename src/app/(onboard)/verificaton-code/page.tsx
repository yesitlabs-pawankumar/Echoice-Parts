"use client";
import { useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { postDataWithoutAuth } from "@/fetchData/fetchApi";
import useLocalStorage from "@/constant/useLocalStorage";

const VerificationCode = () => {
  const router = useRouter();
  const [localStorage, setLocalStorage] = useLocalStorage<any>(
    "forgetUser",
    null
  );
  const formElement = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const lastPath = searchParams.get("lastPath");
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
        const response = await postDataWithoutAuth({
          data: formdata,
          endpoint: "user_forget_otp_verify",
        });
        if (response.user_signup_status === "1") {
          if (lastPath) {
            router.push(`/reset-password?lastPath=${lastPath}`);
          } else {
            router.push("/reset-password");
          }
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
        email: localStorage.email,
      };
      const response = await postDataWithoutAuth({
        data: formdata,
        endpoint: "user_forget_password",
      });

      if (response !== undefined && response?.user_signup_status === "1") {
        toast.success(`OTP send successfully`);
      } else if (response === null || response === undefined) {
        throw "Please singUp first.";
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
    </>
  );
};

export default VerificationCode;
