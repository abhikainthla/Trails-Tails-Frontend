import { useEffect, useRef } from "react";

export const useInfiniteScroll = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return ref;
};
