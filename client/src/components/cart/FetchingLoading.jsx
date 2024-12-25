

function FetchingLoading() {
  return (
    <div className="space-y-4">
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="flex items-center p-4 space-x-4 bg-white rounded-lg shadow animate-pulse"
      >
        <div className="w-16 h-16 bg-gray-300 rounded"></div>
        <div className="flex-1 py-1 space-y-3">
          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default FetchingLoading
