import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../shared/lib/hooks/redux/reduxTypes";
import { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AppTheme from "../../shared/shared-theme/AppTheme";
import Fade from "@mui/material/Fade";

const SECTIONS = [
  { key: "hero", component: <Hero /> },
  { key: "logo", component: <LogoCollection /> },
  { key: "features", component: <Features /> },
  { key: "testimonials", component: <Testimonials /> },
  { key: "highlights", component: <Highlights /> },
  { key: "pricing", component: <Pricing /> },
  { key: "faq", component: <FAQ /> },
  { key: "footer", component: <Footer /> },
];

export default function HomePage(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.user); 
  const [show, setShow] = useState(Array(SECTIONS.length).fill(false));
  
  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
    SECTIONS.forEach((_, i) => {
      setTimeout(() => {
        setShow((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 400 + i * 450);
    });
  }, [isAuth, navigate]);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      {SECTIONS.map((section, i) => (
        <Fade in={show[i]} timeout={700} key={section.key}>
          <div>
            {section.component}
            {["logo", "features", "testimonials", "highlights", "pricing", "faq"].includes(section.key) && <Divider />}
          </div>
        </Fade>
      ))}
    </AppTheme>
  );
}