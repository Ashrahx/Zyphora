export default function UsernameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen overflow-y-auto">{children}</div>;
}
