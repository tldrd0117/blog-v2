import { useHistory } from "react-router-dom";
import { Button } from "@blueprintjs/core";
import React, { ReactNode } from "react";

interface LinkButtonProps{
    path: string,
    children: ReactNode,
    className: string,
}

const LinkButton = ({ path, children, className } : LinkButtonProps) => {
  let history = useHistory();

  function handleClick() {
    history.push(path);
  }

  return (
    <Button className={className} onClick={handleClick}>
        {children}
    </Button>
  );
}

export default LinkButton