"use client";

import { MouseEventHandler, ReactNode } from "react";

const PromptSuggestionButton = ({
  onClick,
  text,
}: {
  onClick: MouseEventHandler;
  text: string;
}) => {
  return (
    <button className="prompt-suggestion-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default PromptSuggestionButton;
