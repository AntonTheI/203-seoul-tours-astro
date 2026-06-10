import { useState, useEffect } from "react";

interface Photo {
  url: string;
  alt?: string;
}

interface Props {
  magazinePhoto?: Photo | null;
  groupPhotos?: Photo[];
}

export function KlmPhotoLightbox({ magazinePhoto, groupPhotos = [] }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    if (lightboxSrc) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxSrc]);

  return (
    <>
      <div className="flex flex-col gap-3">
        {magazinePhoto && (
          <div className="relative cursor-zoom-in" onClick={() => setLightboxSrc(magazinePhoto.url)}>
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
          <div className={`grid gap-2 ${groupPhotos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
            {groupPhotos.map((photo, i) => (
              <img
                key={i}
                src={photo.url}
                alt={photo.alt ?? "KLM tour"}
                className="rounded-xl cursor-zoom-in object-cover aspect-[4/3] w-full"
                onClick={() => setLightboxSrc(photo.url)}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-6"
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            alt=""
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl leading-none hover:text-accent-orange-23 transition-colors"
            onClick={() => setLightboxSrc(null)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
