import CatalogLanding from "../components/organism/CatalogLanding";

export default function AlimentarePage() {
  return <CatalogLanding lookup={{ kind: "sector", entryId: "food-quality" }} />;
}
