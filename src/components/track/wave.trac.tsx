"use client";

import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import WaveSurfer from "wavesurfer.js";
import "./wave.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Tooltip } from "@mui/material";

// KHAI BÁO 1 HOOK USEWAVESUFER ĐỂ SƯ DỤNG - TAO RA 1 OBJ WAVESUFFER
//- tư chạy lại khi options, containerRef change

// CHÚ Ý PHẦN TYPE VƠI REF - VÀ TA CẮT SANG ULTIL CUSTOMEHOOK
// const useWavesurfer = (
//   containerRef: React.RefObject<HTMLDivElement>,
//   //options: WaveSurferOptions , Dùng Type sẵn của WaveSufer --
//   //                            ĐÁNG RA CHỈ CẦN THẾ NÀY - NHƯNG DO TA CÓ KHAI BÁO CONTAINER nên TS lỗi
//   options: Omit<WaveSurferOptions, "container"> // loai bỏ thuoc tính container ra- mình truyền riêng sau
// ) => {
//   const [wavesurfer, setWavesurfer] = useState<any>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;
//     const ws = WaveSurfer.create({
//       ...options,
//       container: containerRef.current,
//     });
//     setWavesurfer(ws);

//     return () => {
//       ws.destroy();
//     };
//   }, [options, containerRef]);
// };

const WaveTrack = () => {
  // dùng useEffect khi cần DOM đã reload đầy đủ và ngay sau đó chỉ thực hiện hàm này 1 lần duy nhất
  // truyền mảng [] vô useEffect -> tải ra hình ảnh soundLoad
  // Lưu ý ko thể dùng ID để lấy phần tữ DOM ảo dc - mà phải dùng useRef mới dc. NHỚ

  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const containerRef = useRef<HTMLDivElement>(null); // TS can giá tri đầu null
  const [time, setTime] = useState("0:00"); // dung ref- hoac state bat vi trí thời gian
  const [duration, setDuration] = useState("0:00");
  const hoverRef = useRef<HTMLDivElement>(null);

  // VU MÀU SẮC THÔI - VI NEXT CÓ RENDER BÊN SERVER NÊN KO BIET DOCUMENT LÀ GÌ - PHẢI CÓ THEM VÒNG LAP
  let gradient: any;
  // check document để chắc là hành vi này xử lý o client - có thuoc tính document chứ k phải ở server
  if (typeof document !== "undefined") {
    let gradient, progressGradient;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    // Define the waveform gradient
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
    gradient.addColorStop(0, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
    gradient.addColorStop(1, "#B1B1B1"); // Bottom color

    // Define the progress gradient
    progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
    progressGradient.addColorStop(0, "#EE772F"); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7) / canvas.height,
      "#EB4926"
    ); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 1) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 2) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 3) / canvas.height,
      "#F6B094"
    ); // Bottom color
    progressGradient.addColorStop(1, "#F6B094"); // Bottom color
  }

  // DÙNG USEMEMO - lưu giá trị return vào cache và thay doi khi tham số 2 [ ] thay doi. bộ return khá ptap
  const optionMemo = useMemo<Omit<WaveSurferOptions, "container">>(() => {
    let gradient, progressGradient;
    if (typeof window !== "undefined") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      // Define the waveform gradient
      gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
      gradient.addColorStop(0, "#656666"); // Top color
      gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
      gradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#B1B1B1"
      ); // Bottom color
      gradient.addColorStop(1, "#B1B1B1"); // Bottom color

      // Define the progress gradient
      progressGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height * 1.35
      );
      progressGradient.addColorStop(0, "#EE772F"); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7) / canvas.height,
        "#EB4926"
      ); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff"
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#F6B094"
      ); // Bottom color
      progressGradient.addColorStop(1, "#F6B094"); // Bottom color
    }

    return {
      waveColor: gradient,
      progressColor: progressGradient,
      height: 100,
      barWidth: 3,
      url: `/api?audio=${fileName}`,
    };
  }, []);

  //console.log("optionMemo:", optionMemo);

  // bỏ ko dùng useEffect để tạo obj WaveSufer mà dùng useWaveSurfer - viết bên customHOok

  // ko thể dùng option thường - phải dùng useMemo để ngăn việc bắn API lien tuc từ url waveSurder
  //
  // const options = {
  //   waveColor: "rgb(200,0,200)",
  //   progressColor: "rgb(100,0,100)",
  //   // ta dùng cơ cấu route thư mục /api mà gọi tới url
  //   url: `/api?audio=${fileName}`,
  // };

  //VÒNG LAP CHẾT NGUOI :TAI SAO DUNG USEMEMO KO PHAI USEEFFECT

  // khi option , current có đủ --> tao ra wavesurfer. --> render lại vì setWavesurfer
  // --> render lại thì options đã thay tham chiếu --> option khác --> kích useEffect chạy
  // --> render tiếp.
  // dùng useMemo để lưu lại option cố định

  const wavesurfer = useWavesurfer(containerRef, optionMemo);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // KO CAN DUNG WAVESUFER QUA 1 USEEFFECT
  // useEffect(() => {
  //   if (containerRef.current) {
  //     const wavesuffer = WaveSurfer.create({
  //       container: containerRef.current, // container cần 1 HTML Element
  //       waveColor: "rgb(200,0,200)",
  //       progressColor: "rgb(100,0,100)",
  //       // ta dùng cơ cấu route thư mục /api mà gọi tới url
  //       url: `/api?audio=${fileName}`,
  //     });

  //     // hàm dọn dẹp của react useEffect
  //     return () => {
  //       wavesuffer.destroy();
  //     };
  //   }
  // }, []);

  const onPlayClick = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
      // cẩn thận nếu viết như bên dưới có thể xảy ra bất đông bô
      //setIsPlaying(wavesurfer.isPlaying());
    }
  }, [wavesurfer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  // xử lý tín hieu play - pause
  useEffect(() => {
    if (!wavesurfer) return setIsPlaying(false);
    // C1- bat doi tuong DOM như Jquery, code của thư viên soundlound
    //const timeEl = document.querySelector("#time")!;
    // C2- dùng ref de bat doi tuong DOM
    // const timeEl = timeRef.current!;
    // const durationEl = durationRef.current!;

    const hover = hoverRef.current!;
    const waveform = containerRef.current!;
    //@ts-ignore
    waveform.addEventListener(
      "pointermove",
      (e) => (hover.style.width = `${e.offsetX}px`)
    );

    const subcription = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("decode", (duration: any) =>
        setDuration(formatTime(duration))
      ),
      wavesurfer.on("timeupdate", (currentTime: any) =>
        setTime(formatTime(currentTime))
      ),

      //xử lý hover
    ];

    return () => {
      subcription.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  // HARDCODE COMMENT
  const arrComments = [
    {
      id: 1,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 10,
      user: "username 1",
      content: "just a comment1",
    },
    {
      id: 2,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 30,
      user: "username 2",
      content: "just a comment3",
    },
    {
      id: 3,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 50,
      user: "username 3",
      content: "just a comment3",
    },
  ];
  // tính toán cách comment

  const calLeft = (moment: number) => {
    const hardCodeDuration = 199;
    const percent = (moment / hardCodeDuration) * 100;
    return `${percent}%`;
  };

  return (
    <>
      <div style={{ marginTop: 20 }}>
        <div
          style={{
            display: "flex",
            gap: 15,
            padding: 20,
            height: 400,
            background:
              "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)",
          }}
        >
          <div
            className="left"
            style={{
              width: "75%",
              height: "calc(100% - 10px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="info" style={{ display: "flex" }}>
              <div>
                <div
                  onClick={() => onPlayClick()}
                  style={{
                    borderRadius: "50%",
                    background: "#f50",
                    height: "50px",
                    width: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {isPlaying === true ? (
                    <PauseIcon sx={{ fontSize: 30, color: "white" }} />
                  ) : (
                    <PlayArrowIcon sx={{ fontSize: 30, color: "white" }} />
                  )}
                </div>
              </div>
              <div style={{ marginLeft: 20 }}>
                <div
                  style={{
                    padding: "0 5px",
                    background: "#333",
                    fontSize: 30,
                    width: "fit-content",
                    color: "white",
                  }}
                >
                  Hỏi Dân IT's song
                </div>
                <div
                  style={{
                    padding: "0 5px",
                    marginTop: 10,
                    background: "#333",
                    fontSize: 20,
                    width: "fit-content",
                    color: "white",
                  }}
                >
                  Eric
                </div>
              </div>
            </div>
            <div ref={containerRef} className="wave-form-container">
              <div className="time">{time}</div>
              <div className="duration">{duration}</div>

              <div ref={hoverRef} className="hover-wave"></div>
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  height: "30px",
                  width: "100%",
                  bottom: "0",
                  // background: "#ccc"
                  backdropFilter: "brightness(0.5)",
                }}
              ></div>

              <div className="comments">
                {arrComments.map((item) => {
                  return (
                    <Tooltip title={item.content} arrow>
                      <img
                        className={"" + item.id} // ép dang string cho className
                        key={item.id}
                        style={{
                          height: 20,
                          width: 20,
                          position: "relative",
                          top: 100,
                          zIndex: 20,
                          left: calLeft(item.moment),
                        }}
                        src={"http://localhost:8000/images/chill1.png"}
                      />
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className="right"
            style={{
              width: "25%",
              padding: 15,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "#ccc",
                width: 250,
                height: 250,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaveTrack;
