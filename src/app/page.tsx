import SkillProfilePage from "./components/employee/skill-profile-view";

export default function Home() {
  return (
    <div>
      <SkillProfilePage
        userId={1}
        employeeEmail="iredui@gmail.com"
        employeeJoinDate="2026-01-21"
        employeeLocation="UB"
        employeeName="iredui"
        employeeRole="senior software engineer"
        employeeTeam="d"
      />
    </div>
  );
}
