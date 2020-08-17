import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { throttle } from '../utils/throttle'

export default (id: string) => {
  const [scroll, setScroll] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });
  const scrollHandler = useCallback(() => {
      throttle(()=> {
        console.log(id)
      setScroll(window.scrollY == 0);
    },100)()
  },[scroll]);
  return scroll;
};
