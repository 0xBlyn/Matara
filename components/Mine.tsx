'use client';

import Image from 'next/image';
import copyicon from '@/images/Group 116.png'
import gradeffect from '@/images/Group 103 (2).png'
import Link from 'next/link';

export default function Mine() {

    const leaderboardData = [
        { username: "@geeakpan", rank: "Sergeant", earnings: "50,022" },
        { username: "@cxsteve", rank: "Sergeant", earnings: "20,022" },
        { username: "@cdspace", rank: "Sergeant", earnings: "12,022" },
        { username: "@thechrisjohn", rank: "Warrior", earnings: "2,500" },
        { username: "@favourani", rank: "Warrior", earnings: "1,022" },
        { username: "@stixx", rank: "Warrior", earnings: "1,009" },
        { username: "@akan", rank: "Scout", earnings: "622" },
        { username: "@edidiongnesu", rank: "Cub Recruit", earnings: "22" },
        { username: "@dhahi", rank: "Cub Recruit", earnings: "22" },
      ]

  return (
    <div>
      <div className='flex flex-col items-center w-full pt-7'>
        <h1 className='heading mb-4'>Ranking</h1>
        <h3 className='text-white text-[14px] font-medium text-center max-w-[70%]'>Strive to be among Top 100,000 members to be eligible for Matara Community Airdrop.</h3>
        <Link href="/mRanks">
          <div className="balance pages mt-4">
            See all Ranks <span className='ml-2'><Image src={copyicon} width={50} height={20} alt='' /> </span>
        </div>
        </Link>
      </div>
      <div className="w-full px-[5%] flex items-center justify-center flex-col pt-[7%]">
      <div className="grid grid-cols-3 gap-4 px-4 w-full mb-2 text-left border-gradient pb-4">
        <div className="headtext text-left">User Name</div>
        <div className="headtext">Rank</div>
        <div className="headtext">Earnings</div>
      </div>
      
      <div className="h-[400px] overflow-y-auto pt-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="space-y-2 px-4">
          {leaderboardData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-5 pb-4"
            >
              <div className="users">{item.username}</div>
              <div className="users">{item.rank}</div>
              <div className="greens">
                {item.earnings} $MAT
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Image className='bottom-[64px] fixed' src={gradeffect} width={400} height={4000} alt='' />
    </div>
  );
}
