export default function StaticPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pt-12">{children}</div>;
}
