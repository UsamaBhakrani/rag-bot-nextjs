"use client";
import { useChat } from "ai/react";
import { Message } from "ai";
import PromptSuggestionRow from "./PromptSuggestionRow";
import Loading from "./Loading";
import Bubble from "./Bubble";

const Chat = () => {
  const {
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    messages,
    input,
  } = useChat({ streamProtocol: "text" });

  const handlePrompt = (content: string) => {
    const msg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };
    append(msg);
  };

  const noMessages = !messages || messages.length === 0;
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
            <PromptSuggestionRow onPromptClick={handlePrompt} />
          </>
        ) : (
          <>
            {messages.map((message, index) => {
              return <Bubble key={index} message={message} />;
            })}
            {isLoading && <Loading />}
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
