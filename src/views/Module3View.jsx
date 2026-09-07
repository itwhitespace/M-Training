import React from 'react';
import { MODULES_CONTENT } from '../data/modulesData';
import { Module4StepContainer } from '../components/common/Module4StepContainer';

export const Module3View = () => {
  const content = MODULES_CONTENT['module-3'];

  return <Module4StepContainer moduleId="module-3" content={content} />;
};
