import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner"; // Assuming sonner is used based on package.json

import { BookingProvider } from "@/context/BookingContext";
import { Topbar } from "@/components/layout/Topbar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookButton } from "@/components/layout/FloatingBookButton";
import { BookingDrawer } from "@/components/booking/BookingDrawer/BookingDrawer";
import SocialSidebar from "@/components/layout/SocialSidebar";
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons";
import ScrollToTop from "@/components/ScrollToTop"; // I will create this

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blogs from "@/pages/Blogs";
import BlogDetail from "@/pages/BlogDetail";
import ServiceDetail from "@/pages/ServiceDetail";
import RefrigeratorService from "@/pages/HomeAppliances/RefrigeratorService";
import NotFound from "@/pages/NotFound";
import { ReactLenis } from 'lenis/react';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ReactLenis root>
      <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <Toaster richColors expand={true} />
        
        <BrowserRouter>
          <ScrollToTop />
          
          <div className="flex min-h-screen flex-col">
            <Topbar />
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:slug" element={<BlogDetail />} />
                <Route path="/services/refrigerator-service" element={<RefrigeratorService />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          
          <SocialSidebar />
          <FloatingActionButtons />
          <BookingDrawer />
        </BrowserRouter>
      </BookingProvider>
    </QueryClientProvider>
    </ReactLenis>
  );
};

export default App;
