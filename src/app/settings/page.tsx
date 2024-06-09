'use client';

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiCube,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';

export default function Settings() {
  return (
    <>
      <button
        data-drawer-target='logo-sidebar'
        data-drawer-toggle='logo-sidebar'
        aria-controls='logo-sidebar'
        type='button'
        className='ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden'
      >
        <span className='sr-only'>Open sidebar</span>
        <svg
          className='h-6 w-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clip-rule='evenodd'
            fill-rule='evenodd'
            d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
          ></path>
        </svg>
      </button>

      <aside
        id='logo-sidebar'
        className='fixed left-0 z-40 w-64 -translate-x-full transition-transform sm:translate-x-0'
        aria-label='Sidebar'
      >
        <Sidebar aria-label='Default sidebar example'>
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem href='#' icon={HiCube}>
                Model Providers
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </aside>

      <div className='p-4 sm:ml-64'>
        <div className='rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700'>
          <div className='mb-4 grid grid-cols-3 gap-4'>
            <div className='flex h-24 items-center justify-center rounded bg-gray-50 dark:bg-gray-800'>
              <p className='text-2xl text-gray-400 dark:text-gray-500'>
                <svg
                  className='h-3.5 w-3.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 18 18'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M9 1v16M1 9h16'
                  />
                </svg>
              </p>
            </div>
            <div className='flex h-24 items-center justify-center rounded bg-gray-50 dark:bg-gray-800'>
              <p className='text-2xl text-gray-400 dark:text-gray-500'>
                <svg
                  className='h-3.5 w-3.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 18 18'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M9 1v16M1 9h16'
                  />
                </svg>
              </p>
            </div>
            <div className='flex h-24 items-center justify-center rounded bg-gray-50 dark:bg-gray-800'>
              <p className='text-2xl text-gray-400 dark:text-gray-500'>
                <svg
                  className='h-3.5 w-3.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 18 18'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M9 1v16M1 9h16'
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className='mb-4 flex h-48 items-center justify-center rounded bg-gray-50 dark:bg-gray-800'>
            <p className='text-2xl text-gray-400 dark:text-gray-500'>
              <svg
                className='h-3.5 w-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
