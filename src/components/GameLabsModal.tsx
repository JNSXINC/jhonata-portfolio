import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const gallery = [
  { file: "biblioteca.png", title: "Biblioteca de jogos" },
  { file: "emuladores.png", title: "Gerenciamento de emuladores" },
  { file: "bios.png", title: "BIOS Manager" },
  { file: "desempenho.png", title: "Desempenho e controles" },
  { file: "perfil.png", title: "Perfil do jogador" },
  { file: "licencas.png", title: "Administração de licenças" },
  { file: "ativacao.png", title: "Ativação do GameLabs" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function GameLabsModal({ open, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const modalRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

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

        if (focusable.length === 0) {
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

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((i) => (i + 1) % gallery.length);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((i) => (i - 1 + gallery.length) % gallery.length);
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
  }, [open]);

  if (!open) return null;

  const current = gallery[index];
  const imageSrc = `/projects/gamelabs/${current.file}`;

  const previous = () => {
    setIndex((i) => (i - 1 + gallery.length) % gallery.length);
  };

  const next = () => {
    setIndex((i) => (i + 1) % gallery.length);
  };

  return (
    <div
      className="gl-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        ref={modalRef}
        tabIndex={-1}
        className="gl-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gamelabs-modal-title"
      >
        <div className="gl-modal-header">
          <div>
            <span className="gl-eyebrow">PROJETO 01 / DESKTOP APPLICATION</span>

            <h2 id="gamelabs-modal-title">GameLabs</h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            className="gl-close"
            onClick={onClose}
            aria-label="Fechar detalhes do GameLabs"
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
                  <small>Confira o nome do arquivo na galeria.</small>
                </div>
              ) : (
                <img
                  src={imageSrc}
                  alt={current.title}
                  onError={() => {
                    setFailedImages((files) =>
                      files.includes(current.file)
                        ? files
                        : [...files, current.file],
                    );
                  }}
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
                    src={`/projects/gamelabs/${item.file}`}
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
            <p className="gl-intro">
              O GameLabs é um launcher de jogos para PC desenvolvido para
              centralizar a biblioteca do jogador em uma única interface. O
              projeto integra jogos de diferentes plataformas, emuladores,
              controles e ferramentas de gerenciamento, oferecendo uma
              experiência unificada.
            </p>

            <h3>Principais funcionalidades</h3>

            <ul>
              <li>
                <strong>Biblioteca centralizada:</strong> organização de jogos,
                favoritos, pesquisa e acesso rápido aos títulos.
              </li>

              <li>
                <strong>Integração com emuladores:</strong> suporte à
                configuração de PCSX2, PPSSPP, DuckStation, RetroArch e Dolphin.
              </li>

              <li>
                <strong>BIOS Manager:</strong> gerenciamento de arquivos BIOS
                necessários para os sistemas compatíveis.
              </li>

              <li>
                <strong>Suporte a controles:</strong> interface utilizável com
                gamepad, opções de teclado e integração com DS4Windows.
              </li>

              <li>
                <strong>Perfis de desempenho:</strong> detecção de hardware e
                opções de configuração para diferentes capacidades de
                computador.
              </li>

              <li>
                <strong>Perfil do jogador:</strong> personalização de avatar,
                biblioteca e jogos favoritos.
              </li>
            </ul>

            <h3>Sistema de licenciamento</h3>

            <p>
              O GameLabs também possui um sistema próprio de licenciamento, com
              ativação vinculada ao dispositivo por meio de identificação
              digital (fingerprint). O fluxo inclui validação de licença e opção
              de experimentação por tempo limitado.
            </p>

            <p>
              O painel administrativo permite emitir licenças, consultar
              registros, acompanhar seus estados e executar ações de{" "}
              <strong>revogação e reativação</strong>. Essa estrutura foi
              desenvolvida para administrar o acesso ao aplicativo.
            </p>

            <div className="gl-stack">
              <span>React</span>
              <span>TypeScript</span>
              <span>Electron</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
