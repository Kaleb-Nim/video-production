import { Composition } from "remotion";
import { HackathonTips } from "../videos/hackathon-tips/src/HackathonTips";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HackathonTips"
      component={HackathonTips}
      durationInFrames={2431}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
