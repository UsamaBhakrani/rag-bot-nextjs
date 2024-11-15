import { Message } from "ai";

const Bubble = ({ message }: { message: Message }) => {
  const { content, role } = message;

  return <div className={"bubble"}>Bubble</div>;
};

export default Bubble;
