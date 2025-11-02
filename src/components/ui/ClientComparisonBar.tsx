'use client';

import React, { useEffect, useState } from 'react';
import ComparisonBar from './ComparisonBar';

const ClientComparisonBar: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <ComparisonBar />;
};

export default ClientComparisonBar;