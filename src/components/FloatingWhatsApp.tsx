"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "919944841707";
  const message = "Hi VClick Digitally,\n\nI'm interested in your digital marketing services.\n\nI'd like to discuss my project.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div 
      className="fixed bottom-[calc(24px+env(safe-area-inset-bottom,0px))] right-6 z-40 flex items-center pointer-events-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Desktop Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden lg:flex items-center gap-2.5 px-4 py-2.5 bg-[#0B0B0B]/85 border border-white/10 backdrop-blur-md rounded-full shadow-2xl mr-3 absolute right-full top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-auto"
          >
            {/* Tiny WhatsApp Icon in Tooltip */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-3.5 h-3.5 fill-[#25D366] shrink-0 animate-pulse"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.488 5.373 1.489 5.39 0 9.774-4.382 9.777-9.774.002-2.611-1.015-5.066-2.87-6.92C17.067 2.097 14.619 1.08 12.01 1.08c-5.394 0-9.778 4.384-9.78 9.778-.001 2.083.548 4.116 1.59 5.922l-.963 3.522 3.6-.944zm11.238-5.321c-.29-.145-1.72-.848-1.986-.944-.266-.096-.46-.145-.653.145-.193.29-.748.944-.917 1.139-.17.194-.339.218-.63.073-.29-.145-1.223-.45-2.33-1.439-.86-.767-1.442-1.716-1.611-2.007-.17-.29-.018-.447.127-.592.13-.13.29-.339.435-.508.145-.17.193-.29.29-.483.097-.193.048-.363-.024-.508-.073-.145-.653-1.573-.895-2.153-.235-.567-.475-.49-.653-.49-.17 0-.363-.012-.556-.012-.193 0-.508.073-.774.363-.266.29-1.015.992-1.015 2.417 0 1.425 1.039 2.799 1.184 2.993.145.193 2.036 3.111 4.931 4.362.688.297 1.226.474 1.643.606.693.22 1.325.19 1.823.115.556-.084 1.72-.703 1.962-1.382.242-.678.242-1.258.17-1.382-.073-.124-.266-.193-.556-.339z" />
            </svg>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-white font-sans">
              Chat with us on WhatsApp
            </span>
            {/* Smooth Indicator Arrow */}
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 w-2 rotate-45 bg-[#0B0B0B]/85 border-r border-t border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="pointer-events-auto flex items-center justify-center rounded-full text-white bg-[#25D366] hover:bg-[#1EBE5D] w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] lg:w-[60px] lg:h-[60px] transition-colors duration-300 shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:shadow-[0_4px_22px_rgba(37,211,102,0.55)] border border-[#25D366]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: isHovered ? 1.08 : 1,
          y: [0, -3, 0]
        }}
        whileTap={{ scale: 0.96 }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            repeatDelay: 6,
            ease: "easeInOut"
          },
          scale: {
            type: "spring",
            stiffness: 400,
            damping: 15
          },
          opacity: {
            duration: 0.4
          }
        }}
      >
        {/* Official WhatsApp SVG Icon */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px] fill-current"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.488 5.373 1.489 5.39 0 9.774-4.382 9.777-9.774.002-2.611-1.015-5.066-2.87-6.92C17.067 2.097 14.619 1.08 12.01 1.08c-5.394 0-9.778 4.384-9.78 9.778-.001 2.083.548 4.116 1.59 5.922l-.963 3.522 3.6-.944zm11.238-5.321c-.29-.145-1.72-.848-1.986-.944-.266-.096-.46-.145-.653.145-.193.29-.748.944-.917 1.139-.17.194-.339.218-.63.073-.29-.145-1.223-.45-2.33-1.439-.86-.767-1.442-1.716-1.611-2.007-.17-.29-.018-.447.127-.592.13-.13.29-.339.435-.508.145-.17.193-.29.29-.483.097-.193.048-.363-.024-.508-.073-.145-.653-1.573-.895-2.153-.235-.567-.475-.49-.653-.49-.17 0-.363-.012-.556-.012-.193 0-.508.073-.774.363-.266.29-1.015.992-1.015 2.417 0 1.425 1.039 2.799 1.184 2.993.145.193 2.036 3.111 4.931 4.362.688.297 1.226.474 1.643.606.693.22 1.325.19 1.823.115.556-.084 1.72-.703 1.962-1.382.242-.678.242-1.258.17-1.382-.073-.124-.266-.193-.556-.339z" />
        </svg>
      </motion.a>
    </div>
  );
};
