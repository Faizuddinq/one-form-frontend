
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormProvider } from "./contexts/FormContext";
import Index from "./pages/Index";
import Builder from "./pages/Builder";
import FormFill from "./pages/FormFill";
import FormResponses from "./pages/FormResponses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FormProvider>
        <div className="min-h-screen bg-primary text-text-primary">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/builder/:formId" element={<Builder />} />
              <Route path="/fill/:formId" element={<FormFill />} />
              <Route path="/responses/:formId" element={<FormResponses />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </FormProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
