import { AlertTriangle, X, Trash2 } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";


const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Delete Template",
  message = "Are you sure you want to delete this template? This action cannot be undone.",
  loading = false,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/60
          backdrop-blur-sm
          px-4
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >

          <motion.div
            className="
            w-full
            max-w-md
            bg-stone-900
            border
            border-stone-800
            rounded-2xl
            shadow-2xl
            p-6
            "
            initial={{
              scale: 0.9,
              y: 20,
            }}
            animate={{
              scale: 1,
              y: 0,
            }}
            exit={{
              scale: 0.9,
              y: 20,
            }}
          >

            {/* Close Button */}

            <button
              onClick={onClose}
              disabled={loading}
              className="
              absolute
              "
            >
            </button>


            <div
              className="
              flex
              justify-between
              items-start
              "
            >

              <div
                className="
                h-12
                w-12
                rounded-xl
                bg-red-500/10
                flex
                items-center
                justify-center
                text-red-400
                "
              >
                <AlertTriangle size={26}/>
              </div>


              <button
                onClick={onClose}
                disabled={loading}
                className="
                text-stone-500
                hover:text-white
                transition
                "
              >
                <X size={20}/>
              </button>

            </div>



            <h2
              className="
              mt-5
              text-xl
              font-semibold
              text-white
              "
            >
              {title}
            </h2>


            <p
              className="
              mt-3
              text-sm
              text-stone-400
              leading-relaxed
              "
            >
              {message}
            </p>



            <div
              className="
              flex
              justify-end
              gap-3
              mt-7
              "
            >

              <button
                onClick={onClose}
                disabled={loading}
                className="
                px-4
                py-2
                rounded-xl
                bg-stone-800
                text-stone-300
                hover:bg-stone-700
                transition
                "
              >
                Cancel
              </button>



              <button
                onClick={onConfirm}
                disabled={loading}
                className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                bg-red-500
                text-white
                font-semibold
                hover:bg-red-600
                transition
                disabled:opacity-50
                "
              >

                <Trash2 size={16}/>

                {loading ? "Deleting..." : "Delete"}

              </button>


            </div>


          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default DeleteConfirmModal;