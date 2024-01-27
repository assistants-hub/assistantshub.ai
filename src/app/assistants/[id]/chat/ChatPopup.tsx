import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import ChatHeader from '@/app/assistants/[id]/chat/ChatHeader';
import ChatMessage from '@/app/assistants/[id]/chat/ChatMessage';

export default function ChatPopup(props: ChatProps) {
  return (
    <>
      <div className='relative flex w-96 overflow-hidden rounded-lg bg-white'>
        <div className='absolute z-0 h-48 w-full rounded-t-lg bg-blue-600'></div>
        <div className='flex h-full flex-col space-y-4 overflow-y-auto p-4'>
          <ChatHeader assistant={props.assistant} />
          <div className='z-10 rounded border-0 border-t-4 border-blue-500 text-sm shadow-md'>
            <div className='flex flex-col space-y-2 rounded-b rounded-t-none border border-t-0 bg-white'>
              <div className='flex flex-col gap-3 px-6 py-4'>
                <ChatMessage
                  assistant={props.assistant}
                  message={'Hi there! How can I help you today'}
                />
                <ChatMessage
                  assistant={props.assistant}
                  from={'user'}
                  message={'Hello! I need some help'}
                />
              </div>
            </div>
          </div>
          <div className='z-10 rounded border-0 border-t-4 border-blue-500 shadow-md'>
            <form>
              <label htmlFor='chat' className='sr-only'>
                Your message
              </label>
              <div className='flex items-center rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700'>
                <textarea
                  id='chat'
                  className='mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='Your message...'
                ></textarea>
                <button
                  type='submit'
                  className='inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'
                >
                  <svg
                    className='h-5 w-5 rotate-90 rtl:-rotate-90'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 18 20'
                  >
                    <path d='m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z' />
                  </svg>
                  <span className='sr-only'>Send message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
