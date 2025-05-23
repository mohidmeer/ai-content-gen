const PixabayLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
      <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
        width="32"
        height="32"
        {...props} // This allows passing any SVG props (like width, height, etc.)
      >
        <style>
          {`

           .sto0 { fill:#0fa4 }
            .st1 { fill: #f9fbf9; }
            .st2 { fill: #fafcfa; }
            
          `}
        </style>
        <title>Pixabay</title>
        <path className="st0" d="M0 0v300h300V0H0z" />
        <path className="st1" d="M64.1 209.2v53.3c-8.5.4-17 .3-25.5-.2-.2-2.6-.5-4.8-.5-6.9 0-37.5-.1-74.9 0-112.4.1-30.2 17.9-55.6 44.9-64.5 40.1-13.3 80.6 15.7 84.3 56.4 2.8 30.6-13.3 57.8-40.1 69.3-8.6 3.7-17.6 4.9-26.8 4.9-11.8.1-23.4.1-36.3.1zm.1-26.9c13.1 0 25.3-.2 37.5 0 21.7.4 37.2-15.8 39.9-35 3-22-12.4-42.2-34.3-45.3h-.1c-20.4-2.7-41 13.1-42.7 34.2-1.3 15-.3 30-.3 46.1z" />
        <path className="st2" d="M238.9 140l48.5 68.2H256l-36-49.3c-13.1 16.3-24 33.2-36.4 49.3h-31.3l48.4-68.2-43.1-64.6H189l30.8 46 30.8-46h31.3l-43 64.6z" />
        <path className="st3" d="M64.2 182.3c0-16.1-1-31.2.2-46 1.7-21.1 22.3-36.9 42.7-34.2 22 3 37.4 23.2 34.4 45.2-2.6 19.2-18.2 35.4-39.9 35-12.1-.2-24.3 0-37.4 0z" />
      </svg>
    );
  };
  
  export default PixabayLogo;