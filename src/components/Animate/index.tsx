import { Variants, motion } from 'framer-motion';

interface TermsDivProps {
  isOpen: boolean;
  children: React.ReactNode;
}
// animation variants
const variants: Variants = {
  visible: { opacity: 1, display: '', height: 'auto' },
  hidden: { opacity: 0, display: 'none', height: '0' },
};

const AnimationContainer: React.FC<TermsDivProps> = ({ isOpen, children }) => {
  return (
    <motion.div
      variants={variants}
      transition={{ duration: 1 }}
      animate={isOpen ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};

export default AnimationContainer;
