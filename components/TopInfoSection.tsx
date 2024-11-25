"use client"

import { useGameStore } from "@/utils/game-mechaincs";
import Image from "next/image";
import badge from '@/images/+Layer 1.png'
import dehaze from '@/images/Frame 2191 (1).png'
import Link from "next/link";

export default function TopInfoSection() {

    const { matAmount } = useGameStore();

    return (
        <div className="px-4 lg:max-w-[500px] sm:py-[3%] flex mt-4 justify-between items-center">
            <div className="flex items-center">
                <Link href='/clicker'>
                    <Image src={badge} width={40} height={40} alt='' />
                </Link>
                <div className="balance ml-[5%]">
                    {matAmount.toFixed(3)}<span className="ml-1">$MAT</span>
                </div>
            </div>
            <div className="flex">
                <button className="connect-btn rounded-sm mr-2">connect</button>
                <Image src={dehaze} alt="" height={50} width={40} />
            </div>
        </div>
    );
}