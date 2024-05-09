"use client";

import { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveTrack = () => {
  // dùng useEffect khi cần DOM đã reload đầy đủ và ngay sau đó chỉ thực hiện hàm này 1 lần duy nhất
  // truyền mảng [] vô useEffect -> tải ra hình ảnh soundLoad
  // Lưu ý ko thể dùng ID để lấy phần tữ DOM ảo dc - mà phải dùng useRef mới dc

  useEffect(() => {
    const element = document.getElementById("hoidanIT"); // dung ID bắt Element ???
    if (element) {
      const wavesurfur = WaveSurfer.create({
        container: element, // container cần 1 HTML Element
        waveColor: "rgb(200,0,200)",
        progressColor: "rgb(100,0,100)",
        url: "/audio/hoidanit.mp3",
      });
    }
  }, []);

  return <div id="hoidanIT">wave tracks</div>;
};

export default WaveTrack;
