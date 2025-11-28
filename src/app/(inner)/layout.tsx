import { HeaderSecondary } from "@/components/layout/header-secondary";
import { Footer } from "@/components/layout/footer";

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderSecondary />
      <main>{children}</main>
      <Footer />
    </>
  );
}
