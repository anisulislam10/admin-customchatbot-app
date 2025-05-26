export default function Badge({ status = 'default', children }) {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      default: 'bg-indigo-100 text-indigo-800',
    };
  
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusClasses[status] || statusClasses.default
        }`}
      >
        {children}
      </span>
    );
  }