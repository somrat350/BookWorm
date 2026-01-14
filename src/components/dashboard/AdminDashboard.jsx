import Image from "next/image";
import Link from "next/link";
import {
  FiUsers,
  FiBook,
  FiMessageSquare,
  FiPlus,
  FiActivity,
} from "react-icons/fi";

export default function AdminDashboard() {
  return (
    <div className="w-full min-h-screen space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Control Center</h1>
          <p className="opacity-70">
            Welcome back, Chief Librarian. Here&apos;s what&apos;s happening
            today.
          </p>
        </div>
        <Link href="/dashboard/addNewBook" className="btn btn-secondary gap-2">
          <FiPlus /> Add New Book
        </Link>
      </div>

      {/* Metric Cards (The "Big Numbers") */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-figure text-primary">
            <FiUsers size={28} />
          </div>
          <div className="stat-title">Total Readers</div>
          <div className="stat-value">2,540</div>
          <div className="stat-desc text-primary">↗︎ 400 (22%) this month</div>
        </div>

        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-figure text-secondary">
            <FiBook size={28} />
          </div>
          <div className="stat-title">Total Titles</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc text-secondary">24 added this week</div>
        </div>

        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-figure text-accent">
            <FiMessageSquare size={28} />
          </div>
          <div className="stat-title">Pending Reviews</div>
          <div className="stat-value">48</div>
          <div className="stat-desc text-accent">Requires attention</div>
        </div>

        <div className="stat bg-base-200 rounded-box shadow">
          <div className="stat-figure text-info">
            <FiActivity size={28} />
          </div>
          <div className="stat-title">Total Genre</div>
          <div className="stat-value">10</div>
          <div className="stat-desc text-info">Start to end</div>
        </div>
      </div>

      {/* Bottom Section: Recent Activity & Quick Moderation */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Reviews Table */}
        <div className="lg:col-span-2 card bg-base-200 shadow-xl overflow-hidden">
          <div className="card-body p-0">
            <div className="p-6 flex justify-between items-center">
              <h2 className="card-title">Recent Review Submissions</h2>
              <Link href={"/"} className="btn btn-secondary btn-sm">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th>User</th>
                    <th>Book</th>
                    <th>Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-8">
                            <Image
                              width={32}
                              height={32}
                              src={
                                "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                              }
                              alt="user image"
                            />
                          </div>
                        </div>
                        <div className="font-bold">John Doe</div>
                      </div>
                    </td>
                    <td>The Great Gatsby</td>
                    <td>⭐⭐⭐⭐⭐</td>
                    <td className="flex">
                      <button className="btn btn-xs btn-success mr-2">
                        Approve
                      </button>
                      <button className="btn btn-xs btn-outline btn-secondary">
                        Delete
                      </button>
                    </td>
                  </tr>
                  {/* Repeat rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Stats/Category Distribution */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Popular Genres</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Fantasy</span>
                  <span>70%</span>
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value="70"
                  max="100"
                ></progress>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Sci-Fi</span>
                  <span>45%</span>
                </div>
                <progress
                  className="progress progress-secondary w-full"
                  value="45"
                  max="100"
                ></progress>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Biography</span>
                  <span>25%</span>
                </div>
                <progress
                  className="progress progress-accent w-full"
                  value="25"
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
