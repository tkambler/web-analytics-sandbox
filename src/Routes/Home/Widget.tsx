import * as React from 'react';
import { useFeature } from '@app/lib/hooks';

export const Widget = () => {

  const widget = useFeature('widget');
  console.log('widget', widget);

  return null;

};

export default Widget;
