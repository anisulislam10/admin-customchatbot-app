export default function StatsCard({ stat }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
        <div className={`mt-1 flex items-baseline ${
          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {stat.changeType === 'positive' ? (
            <svg
              className="h-5 w-5 flex-shrink-0 self-center"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 flex-shrink-0 self-center"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span className="sr-only">
            {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
          </span>
          {stat.change}
        </div>
      </div>
    );
  }