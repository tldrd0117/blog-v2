import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'

export default () => {
  const [errorKey, setErrorKey] = useState("");

  useEffect(() => {
    setErrorKey(new Date()+"")
  });
  return errorKey;
};
