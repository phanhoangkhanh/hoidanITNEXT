"use client";

import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import WaveSurfer from "wavesurfer.js";

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

  // DÙNG USEMEMO
  const optionMemo = useMemo(() => {
    return {
      waveColor: "rgb(200,0,200)",
      progressColor: "rgb(100,0,100)",
      // ta dùng cơ cấu route thư mục /api mà gọi tới url
      url: `/api?audio=${fileName}`,
    };
  }, []);

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

  return <div ref={containerRef}>wave tracks</div>;
};

export default WaveTrack;
