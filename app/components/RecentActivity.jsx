export default function RecentActivity({ activities }) {
    return (
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <ul className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="px-6 py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }