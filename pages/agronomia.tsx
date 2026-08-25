import CatalogLanding from "../components/organism/CatalogLanding";

export default function AgronomiaPage() {
  return (
    <CatalogLanding lookup={{ kind: "sector", entryId: "agronomy-agri-food" }} />
  );
}
