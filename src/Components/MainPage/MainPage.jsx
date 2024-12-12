import React, { useEffect, useState } from 'react';
import './MainPage.scss';
import Header from './header/header';
import LeftPanel from './left_panel/LeftPanel';
import RightPanel from './right_panel/RightPanel';
import { AppProvider, useAppContext } from './AppContext';

function MainPage() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

function MainContent() {
  const { isButtonPressed, activeLvlButtons, hasActiveButtonLvl } = useAppContext();

  const [fullSizePanel, setFullSizePanel] = useState(false);

  useEffect(() => {

    if (hasActiveButtonLvl) {

      setFullSizePanel(true);
    }
  }, [hasActiveButtonLvl]);

  return (
    <div className="container">
      <Header />
      <div className='panel' style={{ height: `${fullSizePanel ? "61%" : "41%"}` }}>
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  );
}

export default MainPage;
