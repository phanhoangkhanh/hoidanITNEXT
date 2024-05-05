"use client";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AppFooter = () => {
  // sữ dung hook tự chế xac đinh hanh vi khi về đến client mới thưc thi
  const hasMounted = useHasMounted();

  // khi chưa về Client thì ko render ra gì - chờ đến client mới render xuất hiện audio
  // Khi de Server render mà chưa thành hình audio nhưng vẫn render ra giao diện khiến ko có bài hát
  if (!hasMounted) return <></>;
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, backgroundColor: "#f2f2f2" }}
      >
        <Container sx={{ display: "flex", gap: 10 }}>
          <AudioPlayer
            autoPlay
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
            onPlay={(e) => console.log("onPlay")}
            style={{ backgroundColor: "#f2f2f2", boxShadow: "unset" }}
            // other props here
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              minWidth: 100,
            }}
          >
            <div style={{ color: "#ccc" }}>Khanh</div>
            <div style={{ color: "black" }}>The Future Project</div>
          </div>
        </Container>
      </AppBar>
    </>
  );
};

export default AppFooter;
