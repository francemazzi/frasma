"use client";

import { MockStage } from "../organism/productMocks";
import type { GrainVariant } from "../atoms/GrainMesh";
import {
  AttrezziMock,
  ControlloMock,
  MemoriaMock,
  OfficinaMock,
  ProcedureMock,
  isHarnessDemoId,
  type HarnessDemoId,
} from "./harnessMocks";

const DEMOS: Record<
  HarnessDemoId,
  {
    kicker: string;
    title: string;
    description: string;
    variant: GrainVariant;
    Mock: typeof OfficinaMock;
  }
> = {
  officina: {
    kicker: "Prova il concetto",
    title: "Solo chat, o l’officina intorno",
    description:
      "Il cursore sceglie un testo. Puoi cliccare anche tu: il pannello cambia. La chat indovina; l’officina mette banco, attrezzi e controllo.",
    variant: "peach",
    Mock: OfficinaMock,
  },
  attrezzi: {
    kicker: "Prova il concetto",
    title: "Indovinare non è leggere",
    description:
      "Scegli se il sistema inventa il codice o va a prenderlo nel PDF e in anagrafica. L’attrezzo rende il dato verificabile.",
    variant: "mist",
    Mock: AttrezziMock,
  },
  memoria: {
    kicker: "Prova il concetto",
    title: "L’errore che resta, o che si dimentica",
    description:
      "Il secondo DDT dello stesso fornitore. Se salvi la lezione, la volta dopo il taccuino è già lì.",
    variant: "lavender",
    Mock: MemoriaMock,
  },
  procedure: {
    kicker: "Prova il concetto",
    title: "Una procedura scritta, non un’invenzione ogni volta",
    description:
      "Clicca una procedura. I passi sul banco cambiano. In officina il metodo si riusa, non si riscrive a memoria.",
    variant: "teal",
    Mock: ProcedureMock,
  },
  controllo: {
    kicker: "Prova il concetto",
    title: "Scrivere subito, o mettere in verifica",
    description:
      "Il gestionale non è una chat. Scegli se il movimento parte da solo o resta in coda per una persona.",
    variant: "peach",
    Mock: ControlloMock,
  },
};

export default function HarnessConceptDemo({ id }: { id: string }) {
  if (!isHarnessDemoId(id)) return null;

  const demo = DEMOS[id];
  const Mock = demo.Mock;

  return (
    <section className="not-prose my-10 scroll-mt-24" aria-label={demo.title}>
      <p className="ed-kicker">{demo.kicker}</p>
      <p className="mt-2 text-[1.25rem] font-medium tracking-[-0.03em] text-farm-text">{demo.title}</p>
      <p className="mt-2 max-w-[58ch] text-[15px] leading-[1.6] text-ink-soft">{demo.description}</p>
      <div className="relative mt-4 h-[22rem] overflow-hidden rounded-3xl border border-hairline-strong bg-paper-2 sm:h-[24rem]">
        <MockStage variant={demo.variant} badge="In funzione">
          <Mock />
        </MockStage>
      </div>
    </section>
  );
}
