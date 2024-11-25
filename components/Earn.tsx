'use client';

import Image from 'next/image';
import { useState } from 'react';
import gradeffect from '@/images/Group 103 (2).png'
import { Task, TaskStatus } from '@/utils/types';

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
            className="connect-btn text-black min-w-full"
          >
            Perform Task
          </button>
        )
      case 'performing':
        return (
          <button
            onClick={onClick}
            className="balance text-[5px]"
          >
            Claim Reward
          </button>
        )
      case 'completed':
        return (
          <button
            disabled
            className="balance min-w-full"
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
      <div className="w-full pt-[12%] px-[5%]">
      <div className="grid grid-cols-3 gap-4 px-4 mb-2 mb-2 text-left border-gradient pb-4">
        <div className="headtext">Task</div>
        <div className="headtext">Earnings</div>
        <div className="headtext">Action</div>
      </div>
      
      <div className="h-[500px] pt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="space-y-4 px-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-3 gap-2 items-center pb-1"
            >
              <div className="users">{task.description}</div>
              <div className="greens items-center flex justify-center w-full -ml-[15%] text-center">{task.earnings}</div>
              <div className='w-[30vw]'>
                {getActionButton(task.status, () => handleAction(task.id))}
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
