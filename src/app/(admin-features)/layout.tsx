import AdminTopBar from "@/component/AdminTopBar";
export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <AdminTopBar />
        {children}
    </div>
  );
}