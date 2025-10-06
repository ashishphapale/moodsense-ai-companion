import { motion } from "framer-motion";
import { MoodType } from "./MoodDetector";
import { Sparkles } from "lucide-react";

interface MotivationalQuoteProps {
  mood: MoodType;
}

const quotes: Record<MoodType, string[]> = {
  happy: [
    "Keep shining, your smile makes the world brighter. ✨",
    "Your joy is contagious – spread it everywhere you go! 🌟",
    "Happiness looks beautiful on you! 😊",
    "You're radiating positive energy today! ☀️",
  ],
  sad: [
    "Even the darkest night will end, and the sun will rise. 🌅",
    "It's okay to not be okay. Take your time. 💙",
    "This feeling is temporary. You're stronger than you know. 💪",
    "Be gentle with yourself – you're doing the best you can. 🌸",
  ],
  angry: [
    "Breathe. You control your emotions, not the other way around. 🧘",
    "This too shall pass. Take a moment to find your calm. 🌊",
    "Your peace is more valuable than proving a point. ☮️",
    "Channel this energy into something positive. You've got this. 🔥",
  ],
  calm: [
    "Peace is power. You're exactly where you need to be. 🕊️",
    "In stillness, you find clarity. Beautiful. 🧘‍♀️",
    "Your calm energy is a gift to yourself and others. 🌿",
    "Serenity is your superpower. Embrace it. 💫",
  ],
  neutral: [
    "Sometimes neutral is exactly what you need. That's perfectly fine. 🌈",
    "Balance is beautiful. You're in harmony right now. ⚖️",
    "Steady and centered – a great place to be. 🎯",
    "Your equilibrium is a strength. Honor it. 🌙",
  ],
  surprised: [
    "Life is full of beautiful surprises! Stay curious. 🎉",
    "Embrace the unexpected – it often leads to magic. ✨",
    "Your sense of wonder keeps you young. Never lose it! 🌟",
    "Surprise is the beginning of discovery. Keep exploring! 🔍",
  ],
};

export const MotivationalQuote = ({ mood }: MotivationalQuoteProps) => {
  const moodQuotes = quotes[mood];
  const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];

  return (
    <motion.div
      key={mood + randomQuote}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <div className="relative p-8 rounded-3xl bg-card border border-border shadow-medium">
        {/* Decorative Icon */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Quote Text */}
        <p className="text-center text-lg md:text-xl font-medium text-foreground leading-relaxed pt-4">
          {randomQuote}
        </p>

        {/* Mood Label */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mt-6 text-center"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wide">
            Feeling {mood}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
