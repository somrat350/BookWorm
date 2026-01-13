"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { CiImageOn, CiUser } from "react-icons/ci";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";

const Profile = () => {
  const session = useSession();
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);

      const imageFile = e.target.image.files[0];
      if (imageFile) {
        formData.append("image", e.target.image.files[0]);
      }
      const res = await axios.put("/api/profile/update", formData);
      if (res.data.success) {
        await session.update();
        setEditable(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (session.status === "loading") {
    return;
  }
  const user = session?.data?.user;

  return (
    <div>
      <title>Profile | BloodLine</title>
      <h2 className="text-3xl font-bold">Profile</h2>
      {/* Header with Edit Button */}
      <div className="flex justify-end mb-5 sm:pr-5">
        {!editable ? (
          <button
            onClick={() => setEditable(true)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <FaRegEdit /> Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => setEditable(false)}
              type="button"
              className="btn btn-secondary mr-3"
            >
              Cancel
            </button>
            <button
              form="profileForm"
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
          </>
        )}
      </div>

      {/* Avatar */}
      <div className="flex flex-col justify-center items-center gap-2 mb-6">
        <Image
          width={96}
          height={96}
          src={user?.photoUrl}
          className="w-24 h-24 rounded-full border"
          alt="Profile"
        />
        <p className="text-sm text-slate-500">{user?.email}</p>
      </div>

      {/* Profile Form */}
      <form
        id="profileForm"
        onSubmit={handleSubmit}
        className="grid sm:grid-cols-2 gap-5"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <div className="relative">
            <input
              type="text"
              required
              disabled={!editable}
              name="name"
              defaultValue={user?.name}
              id="name"
              placeholder="Name"
              className="input input-secondary w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiUser className="text-2xl" />
            </span>
          </div>
        </div>

        {/* Profile image */}
        <div className="flex flex-col gap-2">
          <label htmlFor="userImage">Image</label>
          <div className="relative">
            <input
              type="file"
              disabled={!editable}
              name="image"
              id="userImage"
              className="file-input file-input-secondary w-full pr-8"
            />
            <span className="absolute right-0 top-1 z-10 p-1">
              <CiImageOn className="text-2xl" />
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
