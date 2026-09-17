import { motion } from "motion/react";
import type { ReactNode } from "react";

export function MagneticButton({children,href="#work"}:{children:ReactNode;href?:string}) {
  return (
    <motion.a
      href={href}
      className="magnetic-button"
      whileHover={{scale:1.035}}
      whileTap={{scale:.97}}
      transition={{type:"spring",stiffness:420,damping:24}}
    >
      {children}
    </motion.a>
  );
}