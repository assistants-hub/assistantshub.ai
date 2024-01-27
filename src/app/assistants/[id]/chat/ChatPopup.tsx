import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import ChatHeader from '@/app/assistants/[id]/chat/ChatHeader';
import ChatMessage from '@/app/assistants/[id]/chat/ChatMessage';

export default function ChatPopup(props: ChatProps) {
  return <>
      <div className="flex w-96 bg-white rounded-lg relative overflow-hidden">
        <div className="bg-blue-600 h-48 rounded-t-lg absolute w-full z-0"></div>
        <div className="flex flex-col overflow-y-auto h-full p-4 space-y-4">
          <ChatHeader assistant={props.assistant} />
          <div className="border-0 border-t-4 border-blue-500 rounded z-10 shadow-md text-sm">
            <div className="bg-white border border-t-0 rounded-t-none rounded-b flex flex-col space-y-2">
              <div className="px-6 py-4 flex flex-col gap-3">
                <ChatMessage assistant={props.assistant} message={"Hi there! How can I help you today"}/>
                <ChatMessage assistant={props.assistant} from={"user"} message={"Hello! I need some help"}/>
              </div>
            </div>
          </div>
          <div className="border-0 border-t-4 border-blue-500 rounded z-10 shadow-md">
            <form>
              <label htmlFor="chat" className="sr-only">Your message</label>
              <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <textarea id="chat" rows="1"
                          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Your message..."></textarea>
                <button type="submit"
                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                  <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path
                      d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                  </svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  </>
}