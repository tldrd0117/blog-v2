import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { throttleFactory } from '../utils/throttle'

export default (id: string) => {
  const [scroll, setScroll] = useState(true);
  const throttle = throttleFactory()

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });
  const scrollHandler = useCallback(() => {
      throttle(()=> {
        setScroll(window.scrollY == 0);
      },100)
  },[scroll]);
  return scroll;
};
