interface Subtitle {
  index: number;        
  startTime: string;     
  endTime: string;       
  text: string;         
}

type SrtArray = Subtitle[];

declare type Scene =  {
  scene_id: string;
  scene_title: string;
  text: string;
  images: [string];
  stock_footage?: string | null;
  animation?: string | null;
  transition?: string | null;
  image_description?: string | null;
}


declare type Voice = {
  id: string
  name: string;
  labels: {
    accent: string;
    description: string;
    age: string;
    gender: string;
    use_case: string;
  };
  preview_url: string;
}

interface ElevenLabCharacterData {
  characters: string[];
  character_start_times_seconds: number[];
  // character_end_times_seconds: number[];
}

interface WordTimestamps {
  words: string[];
  timestamps: number[];
}

interface HistroyDetails {
  id?:string | null;
  content: string ;
  script: Record<string, any>;
  step: number;
  images: string[]; 
  generatedAudio: string | null | undefined; 
}

declare type SignInParams = {
  email: string;
  password: string;
};
declare type SignUpParams = {
  email: string;
  password: string;
};



