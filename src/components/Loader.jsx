import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as='div'
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="relative w-20 h-20">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 border-4 border-transparent rounded-full border-t-blue-500 border-r-purple-500 animate-spin"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-2 border-4 border-transparent rounded-full border-b-pink-500 border-l-cyan-500 animate-pulse"></div>
        
        {/* Center dot */}
        <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
      </div>
      
      <p className="text-white text-sm font-bold mt-6">
        {progress.toFixed(2)}%
      </p>
      
      {/* Progress bar */}
      <div className="w-32 h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Html>
  );
};

export default CanvasLoader;