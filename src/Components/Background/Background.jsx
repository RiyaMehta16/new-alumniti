import background from "./alumnitibg.svg";

const Background = ({ children, className = "" }) => {
  return (
    <div
      className={`relative  w-full min-h-full bg-cover bg-center ${className} `}
    >
      <div
        className={`relative  w-full h-full min-h-screen bg-cover bg-center pb-36  `}
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="relative z-50 ">{children}</div>
      </div>
    </div>
  );
};

export default Background;
