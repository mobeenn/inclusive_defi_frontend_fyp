import CardTitle from "@/common/card-title";
import AllProjects from "./all-projects";

export default function InvestorView() {
   return (
      <>
         <CardTitle className="uppercase">Projects</CardTitle>
         <AllProjects />
      </>
   );
}
