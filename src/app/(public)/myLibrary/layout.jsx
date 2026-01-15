const MyLibraryLayout = ({ children }) => {
  return children;
};

export default MyLibraryLayout;

export const metadata = {
  title: "My Library | BookWorm",
  description:
    "Manage your personal book collection. Track what you are currently reading, want to read, or have already finished.",
  openGraph: {
    title: "My Personal Library | BookWorm",
    description: "Keeping track of my reading journey on BookWorm.",
    type: "website",
  },
};
