import React, { useEffect } from 'react';
import { useFeature } from '@app/lib/hooks';

export function Home() {

  const fooFeature = useFeature('foo');
  
  useEffect(() => {
    console.log('fooFeature', fooFeature);
  }, [fooFeature]);

  return (
    <div>
      <p>Welcome home. Foo feature is: { fooFeature.on ? 'enabled' : 'disabled'}.</p>
    </div>
  );
}

export default Home;
