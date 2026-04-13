import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-6">
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800"> 
           Hi, I'm <span className="text-blue-600">Rezaer Rabby</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Frontend Developer | Next.js Learner 🚀
          </p>

          <p className="text-sm text-gray-500">
            I build modern, responsive and user-friendly web applications.
          </p>

          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
            Contact Me
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <div className="relative w-64 h-80 md:w-80 md:h-96 overflow-hidden">
            <Image
              src="/profile.png"
              alt="Rezaer Rabby"
              fill
              className="object-cover rounded-2xl shadow-lg"
            />



          </div>
        </div>

      </div>

    </main>
  );
}


