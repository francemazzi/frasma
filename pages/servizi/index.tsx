import CatalogHub from "../../components/organism/CatalogHub";
import { operationalServices } from "../../lib/knowledge";

export default function ServicesIndexPage() {
  return (
    <CatalogHub
      kind="services"
      path="/servizi"
      entries={operationalServices()}
    />
  );
}
