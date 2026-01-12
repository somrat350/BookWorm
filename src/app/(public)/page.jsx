import HeroSection from "../../components/home/HeroSection";
import FeaturedBooks from "../../components/home/FeaturedBooks";
import CategoriesSection from "../../components/home/CategoriesSection";
import TestimonialsSection from "../../components/home/TestimonialsSection";
import CommunitySection from "../../components/home/CommunitySection";
import NewsletterSection from "../../components/home/NewsletterSection";

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
