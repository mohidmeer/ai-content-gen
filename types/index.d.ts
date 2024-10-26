declare type Voice =  {
  id:string
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

interface CharacterData {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
}

interface WordTimestamps {
  words: string[];
  timestamps: number[];
}


declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  

  
  declare type SignInParams = {
    email: string;
    password: string;
  };
  declare type SignUpParams = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    dob: string;
    ssn: string;
    email: string;
    password: string;
  };
  
  declare type LoginUser = {
    email: string;
    password: string;
  };
  
  declare type User = {
    $id: string;
    email: string;
    userId: string;
    dwollaCustomerUrl: string;
    dwollaCustomerId: string;
    firstName: string;
    lastName: string;
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
  };
  

  declare interface CategoryProps {
    category: CategoryCount;
  }

  declare namespace JSX {
    interface IntrinsicElements {
      'rendley-video-editor': {
        id?: string;
        licensename?: string;
        licensekey?: string;
        theme?: string;
        style?: React.CSSProperties;
        // Add more props if needed
      };
    }
  }