export function BoardsSkeletonUi() {
  return (
    <div className="flex flex-col border-t border-[#D8D8D8]">
      {new Array(10).fill(0).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div className="animate-pulse" key={index}>
          <div className="flex justify-between border-b border-[#D8D8D8] px-10 py-6 max-md:px-2">
            <div className="max-w-[60%] truncate text-[#999999] max-md:max-w-[40%]">
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>
            <div className="flex items-center gap-24 max-md:gap-6">
              <div className="truncate text-[#999999]">
                <div className="h-4 w-12 rounded bg-gray-200" />
              </div>
              <div className="text-[#999999] max-md:hidden">
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
              <div className="text-[#999999] md:hidden">
                <div className="h-4 w-12 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
