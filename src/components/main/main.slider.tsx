// KHI THƯ VIEN KẾT HOP NEXTJS BI LỖI - THÌ THEM USECLIENT.
// VIEC NÀY KHIẾN NEXTS CHỈ RENDER HTML- CÒN TẤT CẢ JAVA NÉM VỀ CLIENT XỬ LÝ Y NHƯ REACT THUẦN

"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Button, Divider } from "@mui/material";
import { ChevronLeftSharp, ChevronRightSharp } from "@mui/icons-material";
import { Settings } from "react-slick"; // import interface của Slider sang để nhác thuong ko phải default
import Link from "next/link";

interface IProps {
  data: ITrackTop[]; // data props chứa mảng phần tử là ItrackTop sẽ dc truyền từ server page sang
  title: string;
}

//DATA DC FETCH BÊN SERVER NÉM QUA PROP NHẬN BÊN CLIENT
const MainSlider = (props: IProps) => {
  const { data, title } = props;

  const NextArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        // CSS riêng trong component của MUI
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRightSharp />
      </Button>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        // CSS riêng trong component của MUI
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeftSharp />
      </Button>
    );
  };

  // thêm interface type Settings vô để dc nhắc các thuoc tính
  var settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1, // nghien cứu kỹ Doc của môi MUI component để hiệu chỉnh
    nextArrow: <NextArrow />, // nextArrow type đinh nghĩa JSX.Element nghĩa là 1 khối HTML
    prevArrow: <PrevArrow />,
  };

  return (
    // bỏ nguyên slide vô BOX - //box rất linh hota như 1 thẻ div bao. và thêm
    //   1 số class css trưc tiep lun
    <>
      <Box
        className="slider-container"
        sx={{
          margin: "0 50px",
          ".track": {
            padding: "0 10px",

            img: {
              height: 150,
              width: 150,
            },
          },
          h3: {
            border: "1px solid #ccc",
            padding: "20px",
            height: "200px",
          },
        }}
      >
        <h2>{title}</h2>

        <Slider {...settings}>
          {data.map((track) => {
            return (
              <div className="track" key={track._id}>
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
                />
                <Link href={`/track/${track._id}?audio=${track.trackUrl}`}>
                  <h4>{track.title}</h4>
                </Link>
                <h5>{track.description}</h5>
              </div>
            );
          })}
        </Slider>
        <Divider />
      </Box>
    </>
  );
};

export default MainSlider;
