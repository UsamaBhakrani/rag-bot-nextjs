"use client";
import { useChat } from "ai/react";
import Image from "next/image";
import { Message } from "ai";
import PromptSuggestionRow from "./PromptSuggestionRow";
import Loading from "./Loading";

const Chat = () => {
  const {
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    messages,
    input,
  } = useChat();

  const noMessages = true;
  return (
    <main>
      <section className={noMessages ? "" : "populated"}>
        {noMessages ? (
          <>
            <p className="starter-text">
              The Ultimate place for Uploading your PDF documents and talking to
              it
            </p>
            <br />
            <PromptSuggestionRow />
          </>
        ) : (
          <>
            {/* map messages onto text bubbles */}
            <Loading />
          </>
        )}
      </section>
      <form onSubmit={handleSubmit}>
        <input
          className="question-box"
          type="text"
          name=""
          id=""
          onChange={handleInputChange}
          value={input}
          placeholder="write something to look for"
        />
        <input type="submit" name="" id="" />
      </form>
    </main>
  );
};

export default Chat;
