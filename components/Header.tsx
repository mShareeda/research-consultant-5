
import React from "react";
import { FlaskConical, CheckCircle2 } from "lucide-react";
import { Language } from "../types";
import { getSafeTranslations } from "../utils/translations";

interface HeaderProps {
    lang: Language | null;
    currentStep?: number;
}

const Header: React.FC<HeaderProps> = ({ lang, currentStep = 0 }) => {
  const t = getSafeTranslations(lang);

  return (
    <header className="w-full py-2 md:py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40 transition-all duration-300 supports-[backdrop-filter]:bg-white/60 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-row items-center justify-between gap-3 md:gap-4 relative ${lang === 'en' ? 'flex-row-reverse' : ''}`}>

          {/* Branding */}
          <div className="flex items-center z-10 select-none flex-shrink-0">
             <img
               src="https://drive.google.com/thumbnail?id=1uEEM3KvDl2vrTEF25p3HBvCOXQF3KsGW&sz=w1000"
               referrerPolicy="no-referrer"
               alt="Logo"
               className="h-12 md:h-20 w-auto min-w-[80px] md:min-w-[100px] object-contain transition-all"
             />
          </div>

          {/* Title Area */}
          <div className={`w-full pointer-events-none flex-grow flex flex-col justify-center overflow-hidden ${lang === 'en' ? 'items-start text-left' : 'items-end text-right'}`}>
            <h1 className={`text-base sm:text-lg md:text-2xl font-black text-ink tracking-tight pointer-events-auto leading-snug md:leading-tight py-1 md:py-2 truncate max-w-full ${lang === 'en' ? 'font-display' : ''}`}>
              {t.appTitle}
            </h1>

            {/* Beta Badge */}
            <div className={`pointer-events-auto mt-0.5 md:mt-0 animate-in fade-in duration-700 delay-300 ${lang === 'en' ? 'slide-in-from-left-4' : 'slide-in-from-right-4'}`}>
                <span className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/50 text-amber-600/90 shadow-sm hover:shadow-md transition-all cursor-help select-none">
                    <FlaskConical className="w-2.5 md:w-3 h-2.5 md:h-3" strokeWidth={3} />
                    <span dir="ltr" className="font-mono !text-[8px] md:!text-[10px] font-bold tracking-widest uppercase">{t.beta}</span>
                </span>
            </div>
          </div>
          
        </div>

        {/* Step Progress Bar (Desktop) */}
        {currentStep > 0 && currentStep <= 4 && (
          <div className="hidden sm:flex items-center justify-center gap-0 w-full mt-6 px-4">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                {/* Step Node */}
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all ${
                      step < currentStep
                        ? "bg-indigo-600 text-white shadow-md"
                        : step === currentStep
                        ? "bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-300"
                        : "border-2 border-indigo-200 text-indigo-400"
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                </div>

                {/* Connecting Track */}
                {step < 4 && (
                  <div className="flex-1 max-w-[60px] h-1 md:h-1.5 mx-2 md:mx-3 rounded-full bg-indigo-100 relative">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        step < currentStep ? "bg-indigo-600" : "bg-indigo-100"
                      }`}
                      style={{
                        width: step < currentStep ? "100%" : "0%",
                      }}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Step Progress Bar (Mobile) */}
        {currentStep > 0 && currentStep <= 4 && (
          <div className="sm:hidden w-full text-center mt-4 px-4">
            <span className="text-xs md:text-sm font-bold text-slate-600">
              Step {currentStep} of 4
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;