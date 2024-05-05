// KHI THƯ VIEN KẾT HOP NEXTJS BI LỖI - THÌ THEM USECLIENT.
// VIEC NÀY KHIẾN NEXTS CHỈ RENDER HTML- CÒN TẤT CẢ JAVA NÉM VỀ CLIENT XỬ LÝ Y NHƯ REACT THUẦN

"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Button, Divider } from "@mui/material";
import { ChevronLeftSharp, ChevronRightSharp } from "@mui/icons-material";
import { Settings } from "react-slick"; // import interface của Slider sang để nhác thuong ko phải default

const MainSlider = () => {
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
          ".abc": {
            padding: "0 10px",
          },
          h3: {
            border: "1px solid #ccc",
            padding: "20px",
            height: "200px",
          },
        }}
      >
        <h2>Multiple Tracks</h2>

        <Slider {...settings}>
          <div className="abc">
            <h3>Track 1</h3>
          </div>
          <div className="abc">
            <h3>Track 2</h3>
          </div>
          <div className="abc">
            <h3>Track 3</h3>
          </div>
          <div className="abc">
            <h3>Track 4</h3>
          </div>
          <div className="abc">
            <h3>Track 5</h3>
          </div>
          <div className="abc">
            <h3>Track 6</h3>
          </div>
          <div className="abc">
            <h3>Track 7</h3>
          </div>
        </Slider>
        <Divider />
        <Slider {...settings}>
          <div className="abc">
            <h3>Track 1</h3>
          </div>
          <div className="abc">
            <h3>Track 2</h3>
          </div>
          <div className="abc">
            <h3>Track 3</h3>
          </div>
          <div className="abc">
            <h3>Track 4</h3>
          </div>
          <div className="abc">
            <h3>Track 5</h3>
          </div>
          <div className="abc">
            <h3>Track 6</h3>
          </div>
          <div className="abc">
            <h3>Track 7</h3>
          </div>
        </Slider>
        <Divider />
      </Box>
    </>
  );
};

export default MainSlider;
