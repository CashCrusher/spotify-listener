import React from 'react';
import { EcosystemModal } from '@/components/EcosystemModal';
import { useNavigate } from 'react-router-dom';

export const ConnectPage = ({ darkMode }: { darkMode: boolean }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <EcosystemModal 
        isOpen={true} 
        onClose={() => navigate('/')} 
        darkMode={darkMode} 
      />
    </div>
  );
};
