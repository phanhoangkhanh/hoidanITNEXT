import AppHeader from "@/components/header/app.header";
import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequestJS } from "@/utils/old.api";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

// nhớ có async nhé - QUAN TRỌNG
export default async function HomePage() {
  // Dùng AuthOption để kiểm AUth nguoi dùng
  const session = await getServerSession(authOptions);

  // fetch data ơ đây để dùng moi truong fetch bên server
  // Đây là fetch ngay ở component không qua async, await gì cả
  // Đây là server

  // CÁCH 1: DÙNG FETCH TRỰC TIEP TAI COMPONENT
  // const res = await fetch("http://localhost:8000/api/v1/tracks/top", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ category: "CHILL", limit: 10 }),
  // });
  // console.log("fetch server songs: ", res.json());

  // CÁCH 2: DÙNG 1 WRAPPER VIẾT SẴN VÀ TRUYỀN PROPS TUONG ƯNG VÀO ĐỂ TAO API GỬI
  // const res = await sendRequestJS({
  //   url: "http://localhost:8000/api/v1/tracks/top",
  //   method: "POST",
  //   body: { category: "CHILL", limit: 1 },
  // });
  // console.log(">>> check re:", res); // hien truc tiep o terminal server - k thể hien bên console browser

  // CÁCH 3: GOI FETCH TỪ API TYPESCRIPT - generic lồng nhau. 1 mảng chứa phần tử có type ITrackTop

  // DÙNG SESSION - BÊN SERVER ĐỂ KIỂM TRA LOGIN MỚI CALL API
  const chill = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "CHILL", limit: 10 },
  });

  const workout = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "WORKOUT", limit: 10 },
  });

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "PARTY", limit: 10 },
  });

  return (
    <Container>
      <MainSlider data={chill?.data ?? []} title={"Top Chill"} />
      <MainSlider data={workout?.data ?? []} title={"Top Workout"} />
      <MainSlider data={party?.data ?? []} title={"Top Party"} />
    </Container>
  );
}
