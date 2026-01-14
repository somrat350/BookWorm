"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaBook,
  FaBuilding,
  FaLayerGroup,
  FaLightbulb,
  FaQuoteLeft,
  FaTrophy,
} from "react-icons/fa";
import Swal from "sweetalert2";

const EditBookForm = ({ book, genres }) => {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: book,
  });
  const selectedFile = watch("image");
  const [preview, setPreview] = useState(book?.image || null);
  const [loading, setLoading] = useState(false);
  const languages = ["English", "Bengali", "Spanish", "French"];
  const difficulties = ["Easy", "Medium", "Hard"];

  // Update preview when a new file is selected
  useEffect(() => {
    if (
      selectedFile &&
      selectedFile instanceof FileList &&
      selectedFile.length > 0
    ) {
      const file = selectedFile[0];
      if (file instanceof File || file instanceof Blob) {
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    }
  }, [selectedFile]);

  // upload image on imgBB website
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const imgApiUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_API}`;
    const res = await axios.post(imgApiUrl, formData);
    return res.data.data.url;
  };

  const handleEditBook = async (data) => {
    setLoading(true);
    try {
      let imageUrl = book.image;
      if (
        data.image &&
        data.image instanceof FileList &&
        data.image.length > 0
      ) {
        imageUrl = await uploadImage(data.image[0]);
      }
      if (data._id) {
        delete data._id;
      }
      const finalData = { ...data, image: imageUrl };
      const res = await axios.patch(`/api/books/${book._id}`, finalData);
      if (res.data.modifiedCount > 0) {
        router.refresh();
        Swal.fire({
          title: "Updated!",
          text: "This book has been updated.",
          showConfirmButton: false,
          timer: 1500,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditBook)}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-base-200 p-6 rounded-3xl shadow-2xl"
    >
      {/* --- SECTION: CORE IDENTITY --- */}
      <div className="col-span-full border-b pb-2 mb-2 border-secondary/20">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <FaBook className="text-secondary" /> Core Identity
        </h3>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">
            Title <span className="text-error">*</span>
          </span>
        </label>
        <input
          required
          type="text"
          {...register("title")}
          placeholder="The Midnight Library"
          className="input input-secondary w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">
            Author <span className="text-error">*</span>
          </span>
        </label>
        <input
          required
          type="text"
          {...register("author")}
          placeholder="Matt Haig"
          className="input input-secondary w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">ISBN</span>
        </label>
        <input
          required
          type="text"
          {...register("isbn")}
          placeholder="978-0525559474"
          className="input input-secondary w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Book Cover Image</span>
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-4 bg-base-100 p-4 rounded-2xl border border-secondary/20 shadow-inner">
          {/* Preview Box */}
          <div className="relative w-24 h-32 bg-base-300 rounded-lg overflow-hidden border-2 border-dashed border-secondary/30 flex items-center justify-center">
            {preview ? (
              <Image
                fill
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaBook className="text-3xl opacity-20" />
            )}

            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="loading loading-spinner loading-md text-white"></span>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex-1 w-full space-y-2">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="file-input file-input-bordered file-input-secondary file-input-sm w-full"
            />
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold opacity-50">
                Max size: 2MB
              </span>
              {selectedFile && selectedFile.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview(book?.image);
                    setValue("image", null);
                  }}
                  className="text-[10px] text-error font-bold uppercase hover:underline"
                >
                  Remove Selection
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Genre</span>
        </label>
        <select
          required
          {...register("genre")}
          className="select select-secondary w-full"
        >
          {genres.map((g, i) => (
            <option key={i} value={g.title}>
              {g.title}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold text-info">Publisher</span>
        </label>
        <div className="relative">
          <input
            required
            type="text"
            {...register("publisher")}
            placeholder="Canongate Books"
            className="input input-secondary w-full"
          />
          <FaBuilding className="absolute right-3 top-4 opacity-20" />
        </div>
      </div>

      {/* --- SECTION: PHYSICAL & TECH SPECS --- */}
      <div className="col-span-full border-b pb-2 mt-4 border-primary/20">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <FaLayerGroup className="text-primary" /> Technical Specs
        </h3>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Published Year</span>
        </label>
        <input
          required
          type="number"
          {...register("publisherYear")}
          placeholder="2020"
          className="input input-secondary w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Total Pages</span>
        </label>
        <input
          required
          type="number"
          {...register("pages")}
          placeholder="288"
          className="input input-secondary w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Language</span>
        </label>
        <select
          required
          {...register("language")}
          className="select select-secondary w-full"
        >
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Reading Time</span>
        </label>
        <input
          required
          type="text"
          {...register("readingTime")}
          placeholder="4-6 hours"
          className="input input-secondary w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold">Difficulty</span>
        </label>
        <select
          required
          {...register("difficulty")}
          className="select select-secondary w-full"
        >
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control col-span-full">
        <label className="label-text font-bold mb-2">Available Formats</label>
        <div className="flex flex-wrap gap-6 bg-base-100 p-3 rounded-lg">
          {["Hardcover", "Paperback", "eBook", "Audiobook"].map((f) => (
            <label key={f} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={f}
                {...register("format")}
                className="checkbox checkbox-secondary checkbox-sm"
              />
              <span>{f}</span>
            </label>
          ))}
        </div>
      </div>

      {/* --- SECTION: DESCRIPTIONS & ARRAYS --- */}
      <div className="col-span-full border-b pb-2 mt-4 border-accent/20">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <FaLightbulb className="text-accent" /> Content & Awards
        </h3>
      </div>

      <div className="form-control col-span-full">
        <label className="label">
          <span className="label-text font-bold">Short Description</span>
        </label>
        <input
          required
          type="text"
          {...register("description")}
          placeholder="One-sentence hook..."
          className="input input-secondary w-full"
        />
      </div>

      <div className="form-control flex flex-col col-span-full">
        <label className="label">
          <span className="label-text font-bold">Full Description</span>
        </label>
        <textarea
          required
          {...register("fullDescription")}
          className="textarea textarea-secondary w-full h-24"
          placeholder="Detailed plot summary..."
        ></textarea>
      </div>

      <div className="form-control col-span-full">
        <label className="label">
          <span className="label-text font-bold flex items-center gap-2">
            <FaTrophy className="text-warning" /> Awards
          </span>
        </label>
        <input
          required
          type="text"
          {...register("awards")}
          placeholder="Separate with commas (e.g. Goodreads Choice, Pulitzer)"
          className="input input-secondary w-full"
        />
      </div>

      <div className="form-control col-span-full">
        <label className="label">
          <span className="label-text font-bold flex items-center gap-2">
            <FaLayerGroup className="text-info" /> Themes
          </span>
        </label>
        <input
          required
          type="text"
          {...register("themes")}
          placeholder="Psychology, Mental Health, Parallel Lives"
          className="input input-secondary w-full"
        />
      </div>

      <div className="form-control col-span-full">
        <label className="label">
          <span className="label-text font-bold flex items-center gap-2">
            <FaQuoteLeft className="text-accent" /> Quotes
          </span>
        </label>
        <textarea
          required
          {...register("quotes")}
          className="textarea textarea-secondary w-full h-24"
          placeholder="Quote 1 | Quote 2 | Quote 3 (Use '|' to separate)"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`btn btn-secondary col-span-full text-lg shadow-xl mt-6 flex items-center justify-center gap-2 hover:bg-secondary/70 transition ${
          loading && "opacity-70 cursor-not-allowed"
        }`}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-md text-secondary"></span>
            Updating...
          </>
        ) : (
          "Update"
        )}
      </button>
    </form>
  );
};

export default EditBookForm;
