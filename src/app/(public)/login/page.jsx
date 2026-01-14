"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import GoogleBtn from "@/components/public/auth/GoogleBtn";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passValidateText, setPassValidateText] = useState("");
  const [password, setPassword] = useState("");

  if (status === "loading") return;
  if (status === "authenticated") {
    router.push(callbackUrl);
  }

  const handleLogin = async (data) => {
    if (!password) {
      setPassValidateText("Please enter validate password!");
      return;
    }
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!res.error) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful.",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push(callbackUrl);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // password validation
  const passwordValidate = (e) => {
    const tempPass = e.target.value;
    setPassword("");

    if (!/[a-z]/.test(tempPass)) {
      setPassValidateText("Password must contain lowercase.");
      return;
    } else if (!/[A-Z]/.test(tempPass)) {
      setPassValidateText("Password must contain Uppercase.");
      return;
    } else if (tempPass.length < 6) {
      setPassValidateText("Password must 6 letters.");
      return;
    } else {
      setPassValidateText("");
      setPassword(tempPass);
      return;
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-5">
      <div className="bg-base-300 w-full max-w-md p-10 rounded-2xl">
        <h2 className="text-center text-3xl font-bold">Login your account</h2>
        <p className="text-center text-base font-medium mt-4">
          Don&apos;t have an account ?{" "}
          <Link href="/register" className="text-secondary ml-1">
            Register
          </Link>
        </p>
        {/* Google */}
        <GoogleBtn />
        <p className="text-center font-bold text-gray-500 my-4">Or</p>
        {/* Form */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4"
        >
          <div className="relative">
            <input
              required
              {...register("email")}
              type="email"
              placeholder="Email"
              className="bg-base-100 rounded-xl py-4 pl-4 pr-12 w-full"
            />
            <span className="absolute z-10 right-4 top-1/2 -translate-y-1/2 text-lg font-medium p-1">
              <MdEmail />
            </span>
          </div>
          <div className="relative">
            <input
              required
              {...register("password")}
              onChange={passwordValidate}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-base-100 rounded-xl py-4 pl-4 pr-12 w-full"
            />
            {showPassword ? (
              <span
                onClick={() => setShowPassword(false)}
                className="absolute z-10 right-4 top-1/2 -translate-y-1/2 text-lg font-medium p-1 cursor-pointer"
              >
                <FaEye />
              </span>
            ) : (
              <span
                onClick={() => setShowPassword(true)}
                className="absolute z-10 right-4 top-1/2 -translate-y-1/2 text-lg font-medium p-1 cursor-pointer"
              >
                <FaEyeSlash />
              </span>
            )}
          </div>
          {passValidateText && (
            <p className="text-red-500 text-right text-sm mr-2">
              {passValidateText}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`bg-secondary text-white p-4 text-xl font-medium rounded-xl w-full cursor-pointer flex items-center justify-center gap-2 hover:bg-secondary/70 transition ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
