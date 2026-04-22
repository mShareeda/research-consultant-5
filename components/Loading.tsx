
import React from "react";
import { Loader2 } from "lucide-react";
import { Language } from "../types";
import { getSafeTranslations } from "../utils/translations";

interface LoadingProps {
  message?: string;
  lang: Language | null;
}

const Loading: React.FC<LoadingProps> = ({ message, lang }) => {
  const t = getSafeTranslations(lang);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[70] flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-sheet shadow-2xl flex flex-col items-center gap-8 fade-in duration-300 max-w-md w-full text-center border border-slate-100">

        <div className="bg-primary-light p-6 rounded-full">
            <Loader2 className="w-14 h-14 text-indigo-600 animate-spin" />
        </div>

        <div className="space-y-4 w-full">
            <h3 className="text-2xl font-bold text-slate-900">{t.loadingProcessing}</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              {message || t.loadingWait}
            </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
