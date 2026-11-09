import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import type { Project } from "../data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const modalRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const galleryLength = project?.gallery.length ?? 0;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    setIndex(0);
    setFailedImages([]);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      const modal = modalRef.current;

      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key === "Tab" && modal) {
        const focusable = Array.from(
          modal.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );

        if (!focusable.length) {
          event.preventDefault();
          modal.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (!modal.contains(document.activeElement)) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      if (event.key === "ArrowRight" && galleryLength) {
        event.preventDefault();
        setIndex((i) => (i + 1) % galleryLength);
      }

      if (event.key === "ArrowLeft" && galleryLength) {
        event.preventDefault();
        setIndex((i) => (i - 1 + galleryLength) % galleryLength);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [project?.id, galleryLength]);

  if (!project) return null;

  const gallery = project.gallery;
  const current = gallery[index] ?? gallery[0];

  const imageSrc = (file: string) => `/projects/${project.id}/${file}`;

  const previous = () =>
    setIndex((i) => (i - 1 + gallery.length) % gallery.length);

  const next = () => setIndex((i) => (i + 1) % gallery.length);

  return (
    <div
      className="gl-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={modalRef}
        tabIndex={-1}
        className="gl-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="gl-modal-header">
          <div>
            <span className="gl-eyebrow">
              PROJETO {project.number} / {project.category.toUpperCase()}
            </span>
            <h2 id="project-modal-title">{project.name}</h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            className="gl-close"
            onClick={onClose}
            aria-label={`Fechar detalhes de ${project.name}`}
          >
            <X size={23} />
          </button>
        </div>

        <div className="gl-modal-body">
          <div className="gl-gallery">
            <div className="gl-image-frame">
              {failedImages.includes(current.file) ? (
                <div className="gl-missing-image">
                  Imagem não encontrada:
                  <code>{current.file}</code>
                  <small>Confira o arquivo da galeria.</small>
                </div>
              ) : (
                <img
                  src={imageSrc(current.file)}
                  alt={current.title}
                  onError={() =>
                    setFailedImages((files) =>
                      files.includes(current.file)
                        ? files
                        : [...files, current.file],
                    )
                  }
                />
              )}
            </div>

            <div className="gl-gallery-toolbar">
              <span>
                {current.title}
                <small>
                  {index + 1} / {gallery.length}
                </small>
              </span>

              <div className="gl-gallery-buttons">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Imagem anterior"
                >
                  <ArrowLeft size={19} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Próxima imagem"
                >
                  <ArrowRight size={19} />
                </button>
              </div>
            </div>

            <div
              className="gl-thumbnails"
              aria-label="Selecionar imagem da galeria"
            >
              {gallery.map((item, i) => (
                <button
                  type="button"
                  key={item.file}
                  onClick={() => setIndex(i)}
                  className={index === i ? "active" : ""}
                  aria-label={`Ver ${item.title}`}
                  aria-pressed={index === i}
                >
                  <img
                    src={imageSrc(item.file)}
                    alt=""
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.opacity = "0";
                    }}
                  />
                  <span>{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="gl-description">
            <p className="gl-intro">{project.description}</p>

            <h3>Principais funcionalidades</h3>

            <ul>
              {project.features.map((feature) => (
                <li key={feature.title}>
                  <strong>{feature.title}:</strong> {feature.description}
                </li>
              ))}
            </ul>

            {project.extraTitle && (
              <>
                <h3>{project.extraTitle}</h3>
                {project.extraParagraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </>
            )}

            <div className="gl-stack">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="button primary"
                style={{ marginTop: 24, display: "inline-flex" }}
              >
                Visitar site <ExternalLink size={17} />
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
