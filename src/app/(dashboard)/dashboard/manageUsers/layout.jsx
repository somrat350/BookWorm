const ManageUsersLayout = ({ children }) => {
  return children;
};

export default ManageUsersLayout;

export const metadata = {
  title: "Manage Users | BookWorm",
  description:
    "View, edit, and manage all registered users on the BookWorm platform. Admin access only.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};
