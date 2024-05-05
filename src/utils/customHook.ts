import { useState, useEffect } from "react";

// nhằm ngăn viec render 2 nơi server + client của next có thể gây nhiều hieu ứng ko mong muốn
// đảm bảo component đã đến client (chạy đến hook useEffect) mới set true

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};
