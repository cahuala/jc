"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppSettings } from "@/config/app-settings";

export default function ExtraError() {
  const { updateSettings } = useAppSettings();

  useEffect(() => {
    updateSettings({
      appHeaderNone: true,
      appSidebarNone: true,
      appContentClass: "p-0 h-100",
      appContentFullHeight: true,
    });

    return () => {
      updateSettings({
        appHeaderNone: false,
        appSidebarNone: false,
        appContentClass: "",
        appContentFullHeight: false,
      });
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div className="error">
      <div className="error-code">404</div>
      <div className="error-content">
        <div className="error-message">
          Não foi possível encontrar esta página...
        </div>

        <div className="error-desc mb-4">
          A página que procura não existe. <br />
          Talvez estas páginas possam ajudar a encontrar o que procura.
        </div>

        <div>
          <Link href="/" className="btn btn-success px-3">
            Voltar ao Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
