import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({ onPromptClick }: any) => {
  const prompts = ["Who is the highest paid driver in F1?"];
  return (
    <div className="prompt-suggestion-row">
      {prompts.map((prompt, index) => {
        return (
          <PromptSuggestionButton
            onClick={() => onPromptClick(prompt)}
            text={prompt}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default PromptSuggestionRow;
