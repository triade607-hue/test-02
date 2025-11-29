import { HeaderSecondary } from "@/components/layout/header-secondary";
import { Footer } from "@/components/layout/footer";
// import { NewsletterBanner } from "@/components/layout";

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderSecondary />
      <main>{children}</main>
      {/* <NewsletterBanner /> */}
      <Footer />
    </>
  );
}
