import Badge from './Badge';

export default function PackageCard({ pkg, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
          <Badge status={pkg.isActive ? 'active' : 'inactive'}>
            {pkg.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        
        <div className="mt-4">
          <p className="text-3xl font-semibold text-indigo-600">
            ${pkg.price}
            <span className="text-sm text-gray-500 ml-1">/{pkg.billingPeriod}</span>
          </p>
          <p className="text-gray-500 mt-1">{pkg.currency.toUpperCase()}</p>
                  <p className="text-sm text-gray-500">Flows Allowed: {pkg.flowsAllowed}</p>

        </div>

        {pkg.description && (
          <p className="mt-4 text-gray-600">{pkg.description}</p>
        )}

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500">Features</h4>
          <ul className="mt-2 space-y-2">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}