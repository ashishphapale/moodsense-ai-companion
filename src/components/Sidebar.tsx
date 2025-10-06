import { motion, AnimatePresence } from "framer-motion";
import { X, BarChart3, Heart, Wind, Music, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: BarChart3, label: "Graph", description: "Mood trends & analytics" },
  { icon: Heart, label: "Relief", description: "Wellness activities" },
  { icon: Wind, label: "Breathing", description: "Guided exercises", indent: true },
  { icon: Music, label: "Music", description: "Relaxing playlists", indent: true },
  { icon: Calendar, label: "Calendar", description: "Events & reminders" },
  { icon: FileText, label: "Notes", description: "Personal reflections" },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-card border-r border-border shadow-large z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Menu
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-primary/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl hover:bg-primary/10 transition-all duration-300 group ${
                      item.indent ? "pl-12" : ""
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.button>
                ))}
              </nav>

              {/* Footer Info */}
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Your emotional wellness companion
                </p>
                <p className="text-xs text-muted-foreground">
                  Track your mood, practice mindfulness, and discover insights about your emotional patterns.
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
