'use client'
import Image from 'next/image';
import mainCharacter from '@/images/image 25.png';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center pt-[15%] lg:pt-5 max-w-[500px]">
      <div className="w-full max-w-xl text-white flex flex-col items-center">
        <div className="w-64 h-64 lg:w-52 lg:h-52 rounded-full circle-outer p-2 mb-8">
          <div className="w-full h-full rounded-full circle-inner overflow-hidden relative">
            <Image
              src={mainCharacter}
              alt="Main Character"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'scale(1.25) translateY(10%)'
              }}
            />
          </div>
        </div>
                <h1 className="text-3xl font-bold">Welcome to Matara</h1>
        
        <p className="text-xl mb-6 lg:hidden">The game is on the <Link href="/clicker" className="underline">Clicker</Link> page.</p>
        <p className="text-xl mb-6 hidden lg:flex text-center">Please open this on your <br />phone instead</p>
        <div className="flex items-center my-3 space-x-2">
          <Image src="/images/lion.png" alt="Lion" width={32} height={32} className="animate-up-down delay-[0.6s]" />
          <div>
            <Image src="/images/lion.png" alt="Lion" width={32} height={32} />
          </div>
          <Image src="/images/lion.png" alt="Lion" width={32} height={32} className="animate-up-down delay-[0.6s]" />
        </div>
      </div>
    </div>
  );
}
