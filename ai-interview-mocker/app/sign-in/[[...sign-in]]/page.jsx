'use client';
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Side - Background Image Section */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617195737496-bc30194e3b27')" }}>
          </div>

          <div className="relative z-10 p-6 text-white">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <svg className="h-8 sm:h-10" viewBox="0 0 28 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.26392 2.74..."
                  fill="currentColor"
                />
              </svg>
            </a>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Welcome to Squid
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, nobis ullam provident blanditiis sit officia nisi, exercitationem vero nihil repudiandae.
            </p>
          </div>
        </section>

        {/* Right Side - Login Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            {/* Mobile Navigation */}
            <div className="relative -mt-16 block lg:hidden">
              <a className="inline-flex size-16 items-center justify-center" href="#">
                <span className="sr-only">Home</span>
                <svg className="h-8 sm:h-10" viewBox="0 0 28 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.26392 2.74..."
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>

            {/* Sign-in Component */}
            <div className="mt-6">
              <SignIn />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
