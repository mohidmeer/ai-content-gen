
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