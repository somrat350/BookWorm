"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiShield, FiUser, FiTrash2, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users on load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("/api/users");
    setUsers(res.data);
    setLoading(false);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axios.patch(`/api/users/${userId}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        toast.success(`User role updated to ${newRole}`);
        fetchUsers(); // Refresh data
      }
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = (userId, username) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`/api/users/${userId}`);
          if (res.data.deletedCount > 0) {
            toast.success("User deleted from BookWorm");
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
            });
            fetchUsers();
          } else {
            toast.error(res.data.error || "Failed to delete user");
          }
        } catch (error) {
          console.error("Delete Error:", error);
          toast.error("Internal Server Error");
        }
      }
    });
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="opacity-60 text-sm">
            Control permissions and monitor user activity.
          </p>
        </div>
        {/* <div className="relative">
          <FiSearch className="absolute z-10 left-3 top-3 opacity-50" />
          <input
            type="text"
            placeholder="Search by email..."
            className="input input-bordered pl-10 w-64"
          />
        </div> */}
      </div>

      <div className="overflow-x-auto rounded-box border border-base-300 shadow-sm">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>User Info</th>
              <th>Current Role</th>
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        width={40}
                        height={40}
                        src={user.photoUrl}
                        alt="user image"
                      />
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    className={`badge gap-2 ${
                      user.role === "admin" ? "badge-secondary" : "badge-ghost"
                    }`}
                  >
                    {user.role === "admin" ? (
                      <FiShield size={12} />
                    ) : (
                      <FiUser size={12} />
                    )}
                    {user.role}
                  </div>
                </td>
                <td>
                  <select
                    className="select select-bordered select-sm w-full max-w-xs"
                    defaultValue={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="user">Normal User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id, user.name)}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
