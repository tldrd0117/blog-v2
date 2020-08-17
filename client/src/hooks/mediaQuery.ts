import React, { useState, useEffect } from 'react'

export const MediaQuery = {
    mobile: "(max-width: 757px)",
    tablet: "(max-width: 1024px)",
    desktop: "(min-width: 1025px)"
}

export default (query: string) => {
    const [matches, setMatches] = useState(
      window.matchMedia(query).matches
    );
 
    // Activity normally for componentDidMount + componentDidUpdate
    useEffect(() => {
     const media = window.matchMedia(query);
     if (media.matches !== matches) {
       setMatches(media.matches);
     }
 
     const listener = () => setMatches(media.matches);
     media.addListener(listener);
 
     return () => media.removeListener(listener);
    }, [query]);
 
    // publish value for render
    return matches; 
 }