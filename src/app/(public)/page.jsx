import HeroSection from "../../components/public/home/HeroSection";
import FeaturedBooks from "../../components/public/home/FeaturedBooks";
import CategoriesSection from "../../components/public/home/CategoriesSection";
import TestimonialsSection from "../../components/public/home/TestimonialsSection";
import CommunitySection from "../../components/public/home/CommunitySection";
import NewsletterSection from "../../components/public/home/NewsletterSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <FeaturedBooks />
      <CategoriesSection />
      <TestimonialsSection />
      <CommunitySection />
      <NewsletterSection />
    </div>
  );
}
