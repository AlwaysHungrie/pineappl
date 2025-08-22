import Navbar from "@/components/common/navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
          <h1 className="text-4xl font-bold text-gray-300 mb-8">
            Page Not Found
          </h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            The page you're looking for doesn't exist.
          </h2>
          <p className="text-gray-600 mb-6">
            We are not sure what you are looking for. Let's get you back on
            track by starting over.
          </p>
          <Link
            href="/chapters"
            className="inline-block bg-blue-500/20 hover:bg-blue-500/30 cursor-pointer font-medium text-gray-500 px-6 py-3 rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
