export enum NodeType {
  POLAROID = 'POLAROID',
  VINYL = 'VINYL',
  FOG = 'FOG',
  SCROLL = 'SCROLL',
  GIFT = 'GIFT',
  FIREWORKS = 'FIREWORKS',
}

export interface TimelineData {
  id: number;
  date: string;
  title: string;
  type: NodeType;
  content: string;
  imageAlt?: string; // For placeholder text generation
}