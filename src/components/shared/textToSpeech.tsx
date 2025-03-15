import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {CircleStop, Volume2} from "lucide-react";

type TextToSpeechProps = {
  text: string;
};

const TextToSpeech: React.FC<TextToSpeechProps> = ({text}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.6;

  const handleToggle = () => {
    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
    } else {
      synth.speak(utterance);
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
    }
  };

  return (
      <Button className="rounded-full w-8 h-8 border border-gray-500" onClick={handleToggle}>{isPlaying ? <CircleStop/> : <Volume2/>}</Button>
  )
};

export default TextToSpeech;
