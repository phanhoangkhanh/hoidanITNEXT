import { useState, useEffect } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import WaveSurfer from "wavesurfer.js";

// nhằm ngăn viec render 2 nơi server + client của next có thể gây nhiều hieu ứng ko mong muốn
// đảm bảo component đã đến client (chạy đến hook useEffect) mới set true

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

export const useWavesurfer = (
  containerRef: React.RefObject<HTMLDivElement>,
  //options: WaveSurferOptions , Dùng Type sẵn của WaveSufer --
  //                            ĐÁNG RA CHỈ CẦN THẾ NÀY - NHƯNG DO TA CÓ KHAI BÁO CONTAINER nên TS lỗi
  options: Omit<WaveSurferOptions, "container"> // loai bỏ thuoc tính container ra- mình truyền riêng sau
) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | any>(null);

  useEffect(() => {
    if (containerRef.current) {
      const ws = WaveSurfer.create({
        ...options,
        container: containerRef.current,
      });
      setWavesurfer(ws);

      return () => {
        ws.destroy();
      };
    }
  }, [options, containerRef]);
  return wavesurfer;
};
