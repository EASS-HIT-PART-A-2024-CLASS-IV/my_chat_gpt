import ChatComponent from "@/sections/extensions/chat-gpt/chat-component";
import useAuthenticatedRoute from "@/hooks/use-authenticated-route";

function ChatGpt() {
  return (
    <>
      <ChatComponent />
    </>
  );
}


export default useAuthenticatedRoute(ChatGpt);