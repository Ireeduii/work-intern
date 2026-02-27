import SkillProfilePage from "../components/employee/skill-profile-view";

export default function Home() {
  return (
    <div>
      <SkillProfilePage
        userId={1}
        employeeEmail="iredui@gmail.com"
        employeeName="iredui"
        employeeTeam="platform team"
        employeeJoinDate="2026-01-23"
        employeeLocation="UB"
        employeeRole="senior software engineer"
      />
    </div>
  );
}
