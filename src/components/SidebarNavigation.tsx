'use client';

import React, { useEffect, useState } from 'react';

export interface SidebarNavigationProps {
  open?: boolean;
}

export function SidebarNavigation(props: SidebarNavigationProps) {
  const [sideBarCss, setSideBarCss] = useState(
    'fixed top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-100'
  );

  useEffect(() => {
    if (!props.open) {
      setSideBarCss(
        'fixed top-20 left-0 z-40 w-64 h-screen transition-transform sm:-translate-x-full bg-gray-100'
      );
    } else {
      setSideBarCss(
        'fixed top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-100'
      );
    }
  }, [props.open]);

  useEffect(() => {}, [sideBarCss]);

  return (
    <aside
      id='logo-sidebar'
      className={sideBarCss}
      aria-label='SidebarNavigation'
    ></aside>
  );
}
