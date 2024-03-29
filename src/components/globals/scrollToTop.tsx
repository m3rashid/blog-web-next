import { useWindowScroll } from '@mantine/hooks';
import { ArrowNarrowUp } from 'tabler-icons-react';
import { Affix, Button, Transition } from '@mantine/core';

const ScrollToTop = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition='slide-up' mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            leftIcon={<ArrowNarrowUp />}
            style={{ ...transitionStyles, paddingLeft: 10, paddingRight: 0 }}
            onClick={() => scrollTo({ y: 0 })}
          />
        )}
      </Transition>
    </Affix>
  );
};

export default ScrollToTop;
