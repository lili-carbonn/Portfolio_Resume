export default function Loading() {
  return (
    <div className="container mx-auto p-8 pb-20 sm:p-20 bg-gradient-to-r from-amber-50 to-purple-100 rounded-xl flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        <p className="mt-4 text-lg text-gray-600">Loading project...</p>
      </div>
    </div>
  );
}
