import React from 'react';
import { MODULES_CONTENT } from '../data/modulesData';
import { Module4StepContainer } from '../components/common/Module4StepContainer';

export const Module4View = () => {
  const content = MODULES_CONTENT['module-4'];

  return <Module4StepContainer moduleId="module-4" content={content} />;
};
