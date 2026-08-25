import CatalogLanding from "../components/organism/CatalogLanding";

export default function ManutenzionePage() {
  return <CatalogLanding lookup={{ kind: "sector", entryId: "field-service" }} />;
}
