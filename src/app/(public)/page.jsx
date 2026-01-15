import HeroSection from "../../components/public/home/HeroSection";
import FeaturedBooks from "../../components/public/home/FeaturedBooks";
import GenresSection from "../../components/public/home/GenresSection";
import TestimonialsSection from "../../components/public/home/TestimonialsSection";
import CommunitySection from "../../components/public/home/CommunitySection";
import NewsletterSection from "../../components/public/home/NewsletterSection";
import { redirectUser } from "@/lib/redirectUser";

export default async function Home() {
  await redirectUser();
  return (
    <div className="">
      <HeroSection />
      <FeaturedBooks />
      <GenresSection />
      <TestimonialsSection />
      <CommunitySection />
      <NewsletterSection />
    </div>
  );
}
