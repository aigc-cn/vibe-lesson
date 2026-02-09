
// This file has been split into PolicyInterpretation.tsx and ReviewAssistant.tsx.
// It can be safely removed from the project.
import React from 'react';
import { Navigate } from 'react-router-dom';

const PreDeclarationRedirect: React.FC = () => {
  return <Navigate to="/policy-interpretation" />;
};

export default PreDeclarationRedirect;
