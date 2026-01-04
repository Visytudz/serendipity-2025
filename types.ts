export enum InteractionType {
  POLAROID = 'POLAROID',
  VINYL = 'VINYL',
  FOG = 'FOG',
  SCROLL = 'SCROLL',
  GIFT = 'GIFT',
  FIREWORKS = 'FIREWORKS'
}

export interface TimelineNodeData {
  id: number;
  date: string;
  title: string;
  type: InteractionType;
  imageAlt: string;
  image?: string;
  content: string;
  frontText?: string; // For Polaroid
}