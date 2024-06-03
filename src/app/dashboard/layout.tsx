export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <aside className="h-screen w-36 bg-primary"></aside>
      <div className="pt-12">{children}</div>
    </div>
  );
}
