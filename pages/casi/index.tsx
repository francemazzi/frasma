import CatalogHub from "../../components/organism/CatalogHub";
import { caseStudies } from "../../lib/knowledge";

export default function CasesIndexPage() {
  return <CatalogHub kind="cases" path="/casi" entries={caseStudies()} />;
}
