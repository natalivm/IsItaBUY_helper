// The grouped stock list, behind `USE_LEGACY_HOME` in App. It is off, but it still has to
// be reachable by flipping that flag, and it needs the same universe the detail page does.
// Wrapping it here keeps the stock definitions in the lazy half with everything else that
// reads them, so leaving the flag off costs the bundle nothing.
import React, { useMemo } from 'react';

import { TICKERS } from '../constants';
import { buildUniverse } from '../services/universe';
import LegacyHome from './LegacyHome';
import { PanelTab } from './releaseNotes';

interface LegacyHomePageProps {
  updatesSeen: boolean;
  openPanel: (tab: PanelTab) => void;
  navigateTo: (view: string, query?: string) => void;
}

const LegacyHomePage: React.FC<LegacyHomePageProps> = ({ updatesSeen, openPanel, navigateTo }) => {
  const { groupedData } = useMemo(() => buildUniverse(TICKERS), []);
  return (
    <LegacyHome
      tickers={TICKERS}
      groupedData={groupedData}
      updatesSeen={updatesSeen}
      openPanel={openPanel}
      navigateTo={navigateTo}
    />
  );
};

export default LegacyHomePage;
