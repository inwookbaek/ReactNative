import { Timestamp } from "firebase/firestore";

export interface PostDto {
  id: string;
  postId: number;
  createDate: Timestamp;
  title: string;
  content: string;
}

export interface PostWithContentDto extends PostDto {}