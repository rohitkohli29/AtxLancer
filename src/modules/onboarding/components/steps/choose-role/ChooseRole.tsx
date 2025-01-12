import { useState } from "react";
import ChooseRoleCard from "../../ui/ChooseRoleCard";
import { useNavigate } from "react-router-dom";
import OnbordHader from "../../ui/OnbordHader";
import NextStepButton from "../../ui/NextStepButton";
// import { authValidationSchema,AuthSchema } from "@/validation/onboarding/validationSchema";

function ChooseRole() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>();

  const handleChooseRole = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const role = target.closest("[data-role]")?.getAttribute("data-role");
    setRole(role!.toLowerCase());
  };

  const handleRoleSubmit = () => {
    if (role !== 'freelancer' && role !== 'client') return;
    navigate(`../${role}/profile`);
  };

  return (
    <div className="w-full h-full flex items-center justify-between flex-col gap-y-4">
      <OnbordHader
        title="Choose Your Role"
        description="Let us know your purpose and make your experience tailored to your
        needs."
      />
      <div
        className="md:h-4/5 p-2 overflow-hidden grid grid-cols-2 md:gap-x-6 gap-x-2"
        onClick={handleChooseRole}
      >
        <div data-role="freelancer" className="col-span-1">
          <ChooseRoleCard
            isCardActive={role === "freelancer"}
            cardTitle="freelancer"
            cardImage="https://i.pinimg.com/736x/61/9a/64/619a64f22b92742d7595d0bbee3afdee.jpg"
            cardDescription="I'm Find for the join"
          />
        </div>
        <div data-role="client" className="col-span-1">
          <ChooseRoleCard
            isCardActive={role === "client"}
            cardTitle="client"
            cardImage="https://i.pinimg.com/736x/37/ce/c5/37cec543a859adc8f52e68b214d23be3.jpg"
            cardDescription="Search for dev"
          />
        </div>
      </div>
      <NextStepButton handleSubmit={handleRoleSubmit} />
    </div>
  );
}

export default ChooseRole;
