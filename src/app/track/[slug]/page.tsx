"use client";

import WaveTrack from "@/components/track/wave.trac";
import { useSearchParams } from "next/navigation";

// BẢN CHẤT CỦA PARAM ĐỘNG TRÊN URL CHÍNH LÀ PROPS TRUYỀN VÀO COMPONENT
const DetailTrackPage = (props: any) => {
  const { params } = props;
  console.log("check param động:", params);

  const searchParams = useSearchParams();

  // hàm searParams giúp chúng ta loc tham số với key dc truyền veo - ở đây là audio truyền sau dấu ? url
  const search = searchParams.get("audio");
  return (
    <div>
      DetailTrackPage
      <div>
        <WaveTrack />
      </div>
    </div>
  );
};

export default DetailTrackPage;
