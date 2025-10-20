import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../assets/m-box.png';

// BlindBox20Oct.jsx
// Updated: box scales up, shakes, then disappears on reveal. Card uses
// className="rounded-xl p-6 bg-gradient-to-br from-pink-300 to-rose-400 shadow-2xl" and keeps buttons at the bottom.
// Adds random cute images under the wish (place images in src/assets and update names if needed).

function Spark({ index }) {
  const angle = (index / 10) * Math.PI * 2;
  const distance = 120 + Math.random() * 80;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance - 20;
  const delay = Math.random() * 0.25;

  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      animate={{ opacity: 0, x: dx, y: dy, scale: 0.6 }}
      transition={{ duration: 0.9 + Math.random() * 0.4, delay }}
      className={`absolute w-2 h-2 rounded-full`}
      style={{ background: `hsl(${Math.floor(Math.random() * 50) + 320}, 85%, 60%)` }}
      aria-hidden
    />
  );
}

function OpenAnimation({ open, wish, cuteImages = [], onClose }) {
  useEffect(() => {
    if (open) {
      // có thể play sound ở đây
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            initial={{ scale: 0.9, rotate: 0 }}
            animate={{ scale: [1, 1.05, 1], rotate: [0, -4, 4, 0] }}
            transition={{ duration: 0.9, times: [0, 0.3, 0.6, 1] }}
            className="relative z-50 flex flex-col items-center p-4"
            role="dialog"
            aria-modal="true"
          >
            {/* wish card: NOTE card is relative so sparks (absolute) overlay it */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.45 }}
              className="rounded-xl p-8 bg-gradient-to-br from-pink-300 to-rose-400 shadow-2xl w-80 max-w-full flex flex-col relative overflow-hidden"
              style={{ fontFamily: 'Poppins, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
            >
              <h3 className="text-lg font-semibold mb-2">Lời chúc 20/10</h3>

              <div className="text-sm text-gray-800 flex-grow">
                <p>{wish}</p>

                {/* cute images area: show up to 3 random cute images */}
                {cuteImages.length > 0 && (
                  <div className="mt-4 flex items-center justify-center gap-3">
                    {cuteImages.map((src, i) => (
                      <img key={i} src={src} alt={`cute-${i}`} className="w-30 h-30 md:w-40 md:h-40 object-cover rounded-lg shadow-sm" />
                    ))}
                  </div>
                )}
              </div>

              {/* footer buttons pinned to bottom */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white/60"
                >
                  Đóng
                </button>
                <button
                  onClick={() => navigator.clipboard?.writeText(`Lời chúc 20/10: ${wish}`)}
                  className="px-4 py-2 rounded-lg bg-rose-600 text-gray-500 shadow"
                >
                  Sao chép
                </button>
              </div>

              {/* --- SPARKS: absolute overlay so it doesn't affect layout --- */}
              <div className="pointer-events-none absolute inset-0">
                {Array.from({ length: 28 }).map((_, i) => (
                  <Spark key={i} index={i} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function BlindBox20Oct({ seed } = {}) {
  const wishes = [
    "Chúc bạn 20/10 thật nhiều niềm vui, hạnh phúc và tươi cười suốt ngày!",
    "Mong chị/em luôn rạng rỡ, mạnh khỏe và đạt được những ước mơ của mình.",
    "Gửi lời yêu thương: cảm ơn vì đã là bạn tuyệt vời trong cuộc sống.",
    "Chúc ngày 20/10 tràn ngập hoa và những khoảnh khắc đáng nhớ.",
    "Chúc bạn luôn tự tin, xinh đẹp và đầy năng lượng mỗi ngày.",
    "Mong mọi điều tốt lành, thành công và bình an sẽ đến với bạn.",
    "Chúc chị/em có một ngày ấm áp, ngọt ngào và được yêu thương nhiều hơn.",
    "Gửi tặng nụ cười: chúc bạn luôn gặp may mắn và hạnh phúc.",
    "Chúc bạn sức khỏe dồi dào và mỗi ngày đều là một ngày đáng mừng.",
    "Hôm nay hãy nhận thật nhiều yêu thương — bạn xứng đáng với điều đó!",
  ];

  // placeholder cute images - put your actual images into src/assets and update names
  const allCute = [
    "/src/assets/stickers/cute1.jpg",
    "/src/assets/stickers/cute2.jpg",
    "/src/assets/stickers/cute3.png",
    "/src/assets/stickers/cute4.jpg",
    "/src/assets/stickers/cute5.jpg",
    "/src/assets/stickers/cute6.jpg",
    "/src/assets/stickers/cute7.jpg",
    "/src/assets/stickers/cute8.png",
    "/src/assets/stickers/cute9.jpg",
    "/src/assets/stickers/cute10.jpg",
  ];

  const [openAnim, setOpenAnim] = useState(false);
  const [currentWish, setCurrentWish] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [chosenCute, setChosenCute] = useState([]);
  const liveRef = useRef(null);

  // pick deterministic when seed provided
  function pickRandomWish() {
    if (typeof seed === "number") {
      let s = seed;
      s = (s * 1664525 + 1013904223) >>> 0;
      return wishes[s % wishes.length];
    }
    return wishes[Math.floor(Math.random() * wishes.length)];
  }

  function pickCuteImages() {
    const arr = [...allCute];
    const chosen = [];
    // const count = Math.floor(Math.random() * 3) + 1; // 1-3 images
    for (let i = 0; i < 1; i++) {
      const idx = Math.floor(Math.random() * arr.length);
      chosen.push(arr.splice(idx, 1)[0]);
    }
    return chosen;
  }

  const handleOpen = () => {
    if (spinning) return;
    setSpinning(true);
    setCurrentWish("");

    if (liveRef.current) liveRef.current.textContent = "Đang mở hộp... Chúc may mắn!";

    // animate box in-place (scale + shake) then reveal card
    setTimeout(() => {
      const chosen = pickRandomWish();
      setCurrentWish(chosen);
      setChosenCute(pickCuteImages());
      setOpenAnim(true); // this will hide the box (box is rendered only when !openAnim)
      setSpinning(false);
      if (liveRef.current) liveRef.current.textContent = `Bạn nhận được: ${chosen}`;
    }, 900); // matches shake duration
  };

  const handleClose = () => {
    setOpenAnim(false);
    if (liveRef.current) liveRef.current.textContent = "";
  };

  // box animation variants
  const boxAnim = spinning
    ? { scale: [1, 1.06, 0.95, 1.08, 0.0], rotate: [0, -6, 6, -4, 0] }
    : { scale: 1, rotate: 0 };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(180deg,#fff7fb,#fff1f4)" }}>
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-2">🎁 20/10 — Mở hộp lời chúc</h1>
        <p className="text-sm text-gray-600 mb-6">Nhấn hộp màu hồng để nhận lời chúc 20/10 bất ngờ.</p>

        {/* hovering box area: hide when openAnim is true */}
        {!openAnim && (
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.96 }}
              animate={boxAnim}
              transition={{ duration: 0.9 }}
              onClick={handleOpen}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleOpen(); }}
              className="relative rounded-2xl flex items-center justify-center cursor-pointer select-none outline-none w-48 h-48"
              aria-label="Mở hộp nhận lời chúc 20/10"
            >
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="flex items-center justify-center"
              >
                <img src="/src/assets/m-box.png" alt="Hộp màu hồng"
                   className="w-40 lg:w-50 max-w-full h-auto object-contain" />
              </motion.div>

              <motion.div
                initial={{ opacity: 1, y: -10 }}
                animate={{ y: spinning ? -20 : -10 }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs rounded-md px-3 py-1 shadow-lg"
              >
                Mở hộp nè <br/> Bấm vào!
              </motion.div>
            </motion.button>
          </div>
        )}

        {/* helper text */}
        <div className="mt-6 text-sm text-gray-500">Tip: nhấn Enter khi hộp được focus để mở.</div>

        {/* invisible live region (Vietnamese) */}
        <div ref={liveRef} aria-live="polite" aria-atomic className="sr-only" />

        {/* OpenAnimation modal */}
        <OpenAnimation open={openAnim} wish={currentWish} cuteImages={chosenCute} onClose={handleClose} />
      </div>
    </div>
  );
}
