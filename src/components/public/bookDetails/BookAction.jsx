export default function BookAction() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-outline btn-lg w-full"
        >
          📚 Add to Shelf
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
        >
          <li>
            <button>📖 Want to Read</button>
          </li>
          <li>
            <button>📚 Currently Reading</button>
          </li>
          <li>
            <button>✅ Read</button>
          </li>
        </ul>
      </div>

      <button className="btn btn-lg w-full">❤️ Add to Favorites</button>
    </div>
  );
}
