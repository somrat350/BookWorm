export default function Loading({ text = "Loading, please wait..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base-100">
      {/* Spinner */}
      <span className="loading loading-ring loading-lg text-secondary"></span>

      {/* Text */}
      <p className="mt-4 text-sm text-base-content/70">{text}</p>
    </div>
  );
}
