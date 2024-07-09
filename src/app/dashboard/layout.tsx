import SidebarUser from "@/components/SidebarUser";

export default function UserDashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex">
			<SidebarUser />
			<div className="pt-12">{children}</div>
		</div>
	);
}
