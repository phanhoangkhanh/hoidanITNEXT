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
  console.log("next_ko_biet_chỉ server biet:", process.env.BACKEND_URL);
  console.log("next_public:", process.env.NEXT_PUBLIC_BACKEND_URL);
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, backgroundColor: "#f2f2f2" }}
      >
        <Container sx={{ display: "flex", gap: 10 }}>
          <AudioPlayer
            autoPlay
            src={`${process.env.NEXT_PUBLIC_BACKEND_SONG}`}
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
