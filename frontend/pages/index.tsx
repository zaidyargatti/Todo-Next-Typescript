import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-2">
        TODO App Starter 🚀
      </h1>
      <p className="text-gray-700 text-lg mb-6">by Zaid Yargatti</p>

      <div className="flex space-x-4">
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}
