'use client';

import Image from 'next/image';
import { useState } from 'react';
import gradeffect from '@/images/Group 103 (2).png'

export default function Earn() {

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, description: "Repost X Post", earnings: "25 $MAT", status: 'pending' },
    { id: 2, description: "Share on TikTok", earnings: "50 $MAT", status: 'performing' },
    { id: 3, description: "Repost X Post", earnings: "25 $MAT", status: 'pending' },
    { id: 4, description: "Repost X Post", earnings: "25 $MAT", status: 'pending' },
    { id: 5, description: "Repost X Post", earnings: "25 $MAT", status: 'pending' },
    { id: 6, description: "Follow FTLD on X", earnings: "25 $MAT", status: 'completed' },
    { id: 7, description: "Follow FTLD on X", earnings: "25 $MAT", status: 'completed' },
    { id: 8, description: "Like X Post", earnings: "25 $MAT", status: 'completed' },
    { id: 9, description: "Follow Matrix on X", earnings: "25 $MAT", status: 'completed' },
  ])

  const handleAction = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (task.status === 'pending') return { ...task, status: 'performing' }
        if (task.status === 'performing') return { ...task, status: 'completed' }
      }
      return task
    }))
  }

  const getActionButton = (status: TaskStatus, onClick: () => void) => {
    switch (status) {
      case 'pending':
        return (
          <button
            onClick={onClick}
            className="px-4 py-1 text-sm font-medium rounded bg-[#FFB939] text-black hover:bg-[#FFB939]/90 transition-colors"
          >
            Perform Task
          </button>
        )
      case 'performing':
        return (
          <button
            onClick={onClick}
            className="px-4 py-1 text-sm font-medium rounded bg-[#22C55E] text-black hover:bg-[#22C55E]/90 transition-colors"
          >
            Claim Reward
          </button>
        )
      case 'completed':
        return (
          <button
            disabled
            className="px-4 py-1 text-sm font-medium rounded bg-gray-600 text-gray-300 cursor-not-allowed"
          >
            Completed
          </button>
        )
    }
  }

  return (
    <div>
      <div className='flex flex-col items-center w-full pt-7'>
        <h1 className='heading mb-4'>Social Task</h1>
        <h3 className='text-white text-[14px] font-medium text-center max-w-[70%]'>Perform Social Tasks to earn more Matara Tokens ($MAT) and grow your rank.</h3>
      </div>
      <div className="w-full max-w-md">
      <div className="grid grid-cols-3 gap-4 px-4 mb-2">
        <div className="text-[#4A5568] text-sm font-medium">Task</div>
        <div className="text-[#4A5568] text-sm font-medium">Earnings</div>
        <div className="text-[#4A5568] text-sm font-medium">Action</div>
      </div>
      
      <div className="h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="space-y-4 px-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-3 gap-4 border-b border-[#1A202C] pb-4"
            >
              <div className="text-[#A0AEC0] text-sm">{task.description}</div>
              <div className="text-[#22C55E] text-sm font-medium">{task.earnings}</div>
              <div>
                {getActionButton(task.status, () => handleAction(task.id))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <Image className='w-[100vw] -mt-[27%] z-[9] absolute' src={gradeffect} width={400} height={4000} alt='' />
    </div>
  );
}
