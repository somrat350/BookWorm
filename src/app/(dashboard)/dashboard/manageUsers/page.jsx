"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiShield, FiUser, FiTrash2, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
