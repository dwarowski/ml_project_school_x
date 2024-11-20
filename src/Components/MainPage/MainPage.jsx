import React from 'react';

import './MainPage.scss';

import Header from './header/header';
import LeftPanel from './left_panel/LeftPanel';
import RightPanel from './right_panel/RightPanel';

function MainPage() {
  return (
    <div className="container">
      <Header/>
      
      <div className='panel'>
        <LeftPanel/>
        <RightPanel/>
      </div>
      
      
    </div>
  );
}

export default MainPage;
