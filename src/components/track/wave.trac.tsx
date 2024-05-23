"use client";

import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import WaveSurfer from "wavesurfer.js";
import "./wave.scss";

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

  // VU MÀU SẮC THÔI
  const ctx = document.createElement("canvas").getContext("2d")!;
  const gradient = ctx.createLinearGradient(0, 0, 0, 150);
  gradient.addColorStop(0, "rgb(200, 0, 200)");
  gradient.addColorStop(0.7, "rgb(100, 0, 100)");
  gradient.addColorStop(1, "rgb(0, 0, 0)");

  // DÙNG USEMEMO
  const optionMemo = useMemo<Omit<WaveSurferOptions, "container">>(() => {
    return {
      // ta dùng cơ cấu route thư mục /api mà gọi tới url
      url: `/api?audio=${fileName}`,
      barWidth: 2,
      waveColor: gradient,
      progressColor: "rgba(0, 0, 100, 0.5)",
    };
  }, []);

  //console.log("optionMemo:", optionMemo);

  // bỏ ko dùng useEffect để tạo obj WaveSufer mà dùng useWaveSurfer
  // ko thể dùng option thường - phải dùng useMemo để ngăn việc bắn API lien tuc từ url waveSurder
  //
  // const options = {
  //   waveColor: "rgb(200,0,200)",
  //   progressColor: "rgb(100,0,100)",
  //   // ta dùng cơ cấu route thư mục /api mà gọi tới url
  //   url: `/api?audio=${fileName}`,
  // };

  //VÒNG LAP CHẾT NGUOI :
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

  console.log("test:", wavesurfer);

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
    // bat doi tuong DOM như Jquery
    const timeEl = document.querySelector("#time")!;
    const durationEl = document.querySelector("#duration")!;

    const subcription = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on(
        "decode",
        (duration: any) => (durationEl.textContent = formatTime(duration))
      ),
      wavesurfer.on(
        "timeupdate",
        (currentTime: any) => (timeEl.textContent = formatTime(currentTime))
      ),
    ];

    return () => {
      subcription.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <>
      <div ref={containerRef} className="wave-form-container">
        wave tracks
        <div id="time">0:00</div>
        <div id="duration">0:00</div>
      </div>
      <button onClick={() => onPlayClick()}>
        {isPlaying === true ? "PAUSE" : "PLAYING"}
      </button>
    </>
  );
};

export default WaveTrack;
