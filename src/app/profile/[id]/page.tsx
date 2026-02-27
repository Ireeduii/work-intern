import SkillProfilePage from "@/app/components/employee/skill-profile-view";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId)) {
    return <div className="p-8 text-destructive">Invalid user ID</div>;
  }

  return (
    // <ApolloClientProvider>
    <SkillProfilePage
      userId={1}
      employeeName="Ireedui"
      employeeRole="Senior Software Engineer"
      employeeTeam="Platform Team"
      employeeEmail="ireedui@example.com"
      employeeLocation="Ulaanbaatar"
      employeeJoinDate="2025-03-01"
    />
    // </ApolloClientProvider>
  );
}
