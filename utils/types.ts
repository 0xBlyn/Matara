export type IconProps = {
    size?: number;
    className?: string;
}

export type TaskStatus = 'pending' | 'performing' | 'completed';

export type Task = {
    id: number;
    description: string;
    earnings: string;
    status: TaskStatus;
};