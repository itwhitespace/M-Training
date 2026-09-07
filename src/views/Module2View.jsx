import React from 'react';
import { MODULES_CONTENT } from '../data/modulesData';
import { Module4StepContainer } from '../components/common/Module4StepContainer';

export const Module2View = () => {
  const content = MODULES_CONTENT['module-2'];

  return <Module4StepContainer moduleId="module-2" content={content} />;
};
