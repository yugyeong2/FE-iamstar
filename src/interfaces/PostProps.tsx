import { Comment } from './Comment';

export interface PostProps {
    id: string;
    userId: string;
    username: string;
    fullName: string;
    content: string;
    profileUrl: string;
    postUrl: string;
    likes: number;
    comments: Comment[];
    timestamp: string;
}
