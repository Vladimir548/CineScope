import React from 'react';
import style from './style.module.css';

import { Box } from './Box';

export const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_content}>
        <div className=" flex-auto">
          <Box />
        </div>
      </div>
    </div>
  );
};
