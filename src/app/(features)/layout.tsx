
import AdminTopBar from "../component/AdminTopBar";
export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminTopBar/>
        {children}
      </body>
    </html>
  );
}
