'use client';
import AdminLayout from '../../components/AdminLayout.';
import StatsCard from '../../components/StatsCard';
import RevenueChart from '../../components/RevenueChart';
import RecentActivity from '../../components/RecentActivity';
export default function DashboardPage() {
  const stats = [
    { name: 'Total Revenue', value: '0', change: '0', changeType: 'positive' },
    { name: 'Active Subscriptions', value: '0', change: '0', changeType: 'positive' },
    { name: 'New Users', value: '0', change: '0', changeType: 'negative' },
    { name: 'Churn Rate', value: '0', change: '0', changeType: 'positive' },
  ];

  const recentActivity = [
    // { id: 1, user: 'John Doe', action: 'Subscribed to Premium', time: '2 minutes ago' },
    // { id: 2, user: 'Jane Smith', action: 'Cancelled subscription', time: '15 minutes ago' },
    // { id: 3, user: 'Robert Johnson', action: 'Upgraded to Business', time: '1 hour ago' },
    // { id: 4, user: 'Emily Davis', action: 'Downgraded to Basic', time: '3 hours ago' },
    // { id: 5, user: 'Michael Wilson', action: 'Subscribed to Premium', time: '5 hours ago' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatsCard key={stat.name} stat={stat} />
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h2>
          <div className="h-80">
            <RevenueChart />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <RecentActivity activities={recentActivity} />
        </div>
      </div>
    </AdminLayout>
  );
}