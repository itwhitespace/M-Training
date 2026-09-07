import React from 'react';
import { MODULES_CONTENT } from '../data/modulesData';
import { Module4StepContainer } from '../components/common/Module4StepContainer';

export const Module1View = () => {
  const content = MODULES_CONTENT['module-1'];

  return <Module4StepContainer moduleId="module-1" content={content} />;
};
