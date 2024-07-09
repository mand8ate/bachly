"use client";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/avigation-menu";

export default function SidebarUser() {
	return (
		<aside className="h-screen w-fit bg-primary pt-16 pr-2">
			<div className="pl-4">
				<div className="text-accent text-sm">Jobs Simplified</div>
				<div className="text-secondary text-3xl font-bold">
					Ba<span className="text-vibrantdarkblue">chly</span>
				</div>
			</div>
			<div>
				<ul className="">
					<li>Overview</li>
				</ul>
			</div>
		</aside>
	);
}
