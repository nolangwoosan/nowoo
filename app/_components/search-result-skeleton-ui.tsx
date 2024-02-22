export function SearchResultSkeletonUI() {
  return (
    <div className="max-h-96 min-h-8 w-full overflow-y-auto rounded-b-[30px] bg-white shadow-md">
      <div className="flex flex-col gap-4 py-8">
        <div className="text-center text-2xl font-bold text-gray-600 max-md:text-base">아이템</div>
        <div className="flex flex-col">
          {new Array(4).fill(0).map((item) => (
            <div key={item.id} className="animate-pulse">
              <div className="flex items-center gap-4 px-4 py-2 hover:bg-[#FB9E48] hover:text-white">
                <div className="h-12 w-12 rounded-full bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
