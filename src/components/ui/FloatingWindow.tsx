import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = { title: string; children: ReactNode; className?: string };

export function FloatingWindow({ title, children, className = "" }: Props) {
  return (
    <motion.div
      className={`floating-window ${className}`}
      initial={{opacity:0,y:24,rotate:-1}}
      whileInView={{opacity:1,y:0,rotate:0}}
      viewport={{once:true,amount:.25}}
      whileHover={{y:-8,rotate:.25}}
      transition={{duration:.65,ease:[.22,1,.36,1]}}
    >
      <div className="window-bar">
        <span className="window-dots"><i/><i/><i/></span>
        <span>{title}</span>
      </div>
      <div className="window-body">{children}</div>
    </motion.div>
  );
}