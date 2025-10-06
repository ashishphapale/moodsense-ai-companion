import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export type MoodType = "happy" | "sad" | "angry" | "calm" | "neutral" | "surprised";

interface MoodDetectorProps {
  onMoodDetected: (mood: MoodType) => void;
}

export const MoodDetector = ({ onMoodDetected }: MoodDetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        
        // Simulate mood detection for demo (replace with actual face-api.js integration)
        setTimeout(() => {
          simulateMoodDetection();
        }, 2000);
      }
    } catch (err) {
      setError("Unable to access camera. Please grant camera permissions.");
      console.error("Camera access error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsActive(false);
    }
  };

  const simulateMoodDetection = () => {
    // Demo: randomly detect a mood every 5 seconds
    const moods: MoodType[] = ["happy", "sad", "angry", "calm", "neutral", "surprised"];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    onMoodDetected(randomMood);
    
    if (videoRef.current?.srcObject) {
      setTimeout(simulateMoodDetection, 5000);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative rounded-3xl overflow-hidden bg-card border-2 border-border shadow-large">
        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full aspect-video object-cover ${!isActive ? "hidden" : ""}`}
        />

        {/* Placeholder when camera is off */}
        {!isActive && (
          <div className="w-full aspect-video flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="text-center p-8">
              <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">AI Mood Detection</h3>
              <p className="text-muted-foreground mb-6">
                Enable your camera to start real-time emotion analysis
              </p>
              <Button
                onClick={startCamera}
                disabled={isLoading}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                {isLoading ? "Starting..." : "Start Camera"}
              </Button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
            <div className="text-center p-6">
              <CameraOff className="h-12 w-12 mx-auto mb-3 text-destructive" />
              <p className="text-destructive">{error}</p>
              <Button variant="outline" onClick={startCamera} className="mt-4">
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Camera Controls Overlay */}
        {isActive && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Button
              onClick={stopCamera}
              variant="secondary"
              size="sm"
              className="shadow-lg"
            >
              <CameraOff className="h-4 w-4 mr-2" />
              Stop Camera
            </Button>
          </div>
        )}

        {/* Detection Indicator */}
        {isActive && (
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-3 h-3 rounded-full bg-accent shadow-glow"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
