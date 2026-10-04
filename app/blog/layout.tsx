import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <CustomCursor />
      <Navigation />
      {children}
    </div>
  );
}
