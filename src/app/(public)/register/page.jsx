"use client";

import { FaEye, FaEyeSlash, FaImage, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import GoogleBtn from "@/components/public/auth/GoogleBtn";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [passValidateText, setPassValidateText] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleRegister = async (data) => {
    if (!password) {
      toast.error("Please enter validate password!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", data.image[0]);

      const res = await axios.post("/api/auth/register", formData);

      if (res.data.success) {
        const loginRes = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (!loginRes?.error) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Register successful.",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-5">
      <div className="bg-base-300 w-full max-w-md p-10 rounded-2xl">
        <h2 className="text-center text-3xl font-bold">Create new account</h2>
        <p className="text-center text-base font-medium mt-4">
          Already have an account ?{" "}
          <Link href="/login" className="text-secondary ml-1">
            Login
          </Link>
        </p>
        {/* Google */}
        {/* <GoogleBtn /> */}
        {/* <p className="text-center font-bold text-gray-500 my-4">Or</p> */}
        {/* Form */}
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-4 mt-6"
        >
          <div className="relative">
            <input
              required
              {...register("name")}
              type="text"
              placeholder="Name"
              className="bg-base-100 rounded-xl py-4 pl-4 pr-12 w-full"
            />
            <span className="absolute z-10 right-4 top-1/2 -translate-y-1/2 text-lg font-medium p-1">
              <FaUser />
            </span>
          </div>
          <div className="relative">
            <input
              required
              {...register("image")}
              type="file"
              className="bg-base-100 rounded-xl py-4 pl-4 pr-12 w-full"
            />
            <span className="absolute z-10 right-4 top-1/2 -translate-y-1/2 text-lg font-medium p-1">
              <FaImage />
            </span>
          </div>
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
                Registering in...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
