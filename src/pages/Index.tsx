import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { MoodDetector, MoodType } from "@/components/MoodDetector";
import { MotivationalQuote } from "@/components/MotivationalQuote";
import { ParticleBackground } from "@/components/ParticleBackground";
import { motion, AnimatePresence } from "framer-motion";

const moodGradients: Record<MoodType, string> = {
  happy: "from-[hsl(45,100%,85%)] via-[hsl(35,100%,80%)] to-[hsl(45,100%,85%)]",
  sad: "from-[hsl(210,60%,85%)] via-[hsl(220,50%,90%)] to-[hsl(210,60%,85%)]",
  angry: "from-[hsl(0,70%,85%)] via-[hsl(15,60%,80%)] to-[hsl(0,70%,85%)]",
  calm: "from-[hsl(160,60%,85%)] via-[hsl(180,50%,90%)] to-[hsl(160,60%,85%)]",
  neutral: "from-[hsl(270,40%,88%)] via-[hsl(280,35%,92%)] to-[hsl(270,40%,88%)]",
  surprised: "from-[hsl(290,70%,88%)] via-[hsl(320,60%,90%)] to-[hsl(290,70%,88%)]",
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);

  const handleMoodDetected = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Animated Mood Background */}
      <AnimatePresence mode="wait">
        {currentMood && (
          <motion.div
            key={currentMood}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={`fixed inset-0 bg-gradient-to-br ${moodGradients[currentMood]}`}
            style={{ zIndex: -1 }}
          />
        )}
      </AnimatePresence>

      {/* Default Background */}
      {!currentMood && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-background via-secondary to-background"
          style={{ zIndex: -2 }}
        />
      )}

      {/* Navigation */}
      <Navigation onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto max-w-6xl"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              Your Emotional Wellness Companion
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Let AI analyze your emotions in real-time and receive personalized insights to support your mental wellness journey
            </motion.p>
          </div>

         {/* Mood Detector */}
<div className="mb-8">
  <MoodDetector onMoodDetected={handleMoodDetected} />

  {currentMood && (
    <p className="text-center mt-4 text-lg font-medium text-primary">
      Current Mood Detected: {currentMood}
    </p>
  )}
</div>

          {/* Motivational Quote */}
          <AnimatePresence mode="wait">
            {currentMood && (
              <MotivationalQuote mood={currentMood} />
            )}
          </AnimatePresence>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              {
                title: "Track Patterns",
                description: "Understand your emotional trends over time",
                icon: "📊",
              },
              {
                title: "Mindful Relief",
                description: "Access breathing exercises and calming music",
                icon: "🧘",
              },
              {
                title: "Personal Insights",
                description: "Get AI-powered recommendations for wellness",
                icon: "💡",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
