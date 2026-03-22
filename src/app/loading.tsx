export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-purple-200 dark:border-purple-900 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
