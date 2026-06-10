import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  url: string;
  alt?: string;
}

interface Props {
  magazinePhoto?: Photo | null;
  groupPhotos?: Photo[];
}

export function KlmPhotoLightbox({ magazinePhoto, groupPhotos = [] }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = [...(magazinePhoto ? [magazinePhoto] : []), ...groupPhotos];

  const open = (index: number) => setLightboxIndex(index);
  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length,
    );
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    if (lightboxIndex !== null) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const activePhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) next();
    if (delta > 50) prev();
    touchStartX.current = null;
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {magazinePhoto && (
          <div className="relative cursor-zoom-in" onClick={() => open(0)}>
            <img
              src={magazinePhoto.url}
              alt={magazinePhoto.alt ?? "Holland Herald interview"}
              className="rounded-xl w-full object-cover"
            />
            <span className="absolute bottom-2 left-2 text-xs text-white bg-black/50 rounded px-2 py-0.5">
              Holland Herald, 2024
            </span>
          </div>
        )}
        {groupPhotos.length > 0 && (
          <div
            className={`grid gap-2 ${groupPhotos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
          >
            {groupPhotos.map((photo, i) => (
              <img
                key={i}
                src={photo.url}
                alt={photo.alt ?? "KLM tour"}
                className="rounded-xl cursor-zoom-in object-cover aspect-4/3 w-full"
                onClick={() => open(magazinePhoto ? i + 1 : i)}
              />
            ))}
          </div>
        )}
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-6"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={activePhoto.url}
            alt={activePhoto.alt ?? ""}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute top-4 right-4 text-white hover:text-accent-orange-23 transition-colors cursor-pointer"
            onClick={close}
          >
            <X size={28} />
          </button>

          {photos.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-orange-23 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                <ChevronLeft size={40} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent-orange-23 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                <ChevronRight size={40} />
              </button>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
                {(lightboxIndex ?? 0) + 1} / {photos.length}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
