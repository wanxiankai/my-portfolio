
import { useInView } from "react-intersection-observer";

const LazyLoad = ({ children, placeholderHeight = '800px' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView ?
        children
        :
        <div style={{ height: placeholderHeight }} />}
    </div>
  );
};

export default LazyLoad;