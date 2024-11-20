import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose?: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  let borderColor = "";
  if (type === "success") {
    borderColor = "border-green-500";
  } else {
    borderColor = "border-red-500";
  }

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            exit="hidden"
            transition={{ duration: 0.5 }}
            variants={variants}
            className={`fixed bottom-5 z-50 flex items-center justify-center bg-black/20 gap-4 right-5 p-4 rounded-md  text-white border ${borderColor}`}
          >
            {message}
            <button onClick={() => setIsOpen(false)}>
              <IoIosClose className="text-2xl" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
