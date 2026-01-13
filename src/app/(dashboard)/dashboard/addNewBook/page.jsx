"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaBook,
  FaTrophy,
  FaLightbulb,
  FaQuoteLeft,
  FaBuilding,
  FaLayerGroup,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function AddBookPage() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get("/api/genres")
      .then((res) => {
        setGenres(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // upload image on imgBB website
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const imgApiUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_API}`;
    const res = await axios.post(imgApiUrl, formData);
    return res.data.data.url;
  };

  const handleNewBook = async (data) => {
    setLoading(true);
    try {
      // 1. Upload Image to imgBB
      const image = await uploadImage(data.image[0]);

      // 2. Format Arrays
      const finalData = {
        ...data,
        image,
        awards: data.awards ? data.awards.split(",").map((s) => s.trim()) : [],
        themes: data.themes ? data.themes.split(",").map((s) => s.trim()) : [],
        quotes: data.quotes ? data.quotes.split("|").map((s) => s.trim()) : [],
      };

      // 3. Send to your Next.js API
      const res = await axios.post("/api/books", finalData);
      if (res.data.success) {
        toast.success("Book added successfully! 🎉");
        reset();
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const languages = ["English", "Bengali", "Spanish", "French"];
  const difficulties = ["Easy", "Medium", "Hard"];

  if (loading) return <span>Loading...</span>;

  return (
    <div className="">
      <div className="flex flex-col mb-8">
        <h2 className="text-4xl font-bold text-secondary">Add New Book</h2>
        <p className="opacity-60">
          Enter full bibliographic details for the BookWorm database.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleNewBook)}
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
            <span className="label-text font-bold">
              Book Cover Image <span className="text-error">*</span>
            </span>
          </label>
          <input
            required
            type="file"
            accept="image/*"
            {...register("image")}
            className="file-input file-input-secondary w-full"
          />
          <label className="label">
            <span className="label-text-alt opacity-60">
              Upload JPG, PNG or WebP
            </span>
          </label>
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
            {genres.map((g) => (
              <option key={g._id} value={g.title}>
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
          className="btn btn-secondary col-span-full text-lg shadow-xl mt-6"
        >
          Publish to Library
        </button>
      </form>
    </div>
  );
}
