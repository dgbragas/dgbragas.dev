import * as React from 'react';

import AOS from 'aos';

import 'aos/dist/aos.css';

function AOSProvider() {
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    setTimeout(() => AOS.refreshHard(), 500);
  }, []);

  return null;
}

export { AOSProvider };
