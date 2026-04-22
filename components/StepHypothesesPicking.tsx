
import React from "react";
import { Theory, Language } from "../types";
import { translations } from "../utils/translations";
import { Check, ClipboardList, Book, ArrowLeft, ArrowRight, Sparkles, AlertCircle, ListChecks, ListX } from "lucide-react";

interface StepHypothesesPickingProps {
    theories: Theory[];
    theoriesHypotheses: Record<string, string[]>;
    selectedHypotheses: string[];
    onToggle: (hyp: string) => void;
    onToggleBatch?: (hyps: string[], select: boolean) => void;
    onSubmit: () => void;
    onBack: () => void;
    lang: Language;
}

const StepHypothesesPicking: React.FC<StepHypothesesPickingProps> = ({ 
    theories, theoriesHypotheses, selectedHypotheses, onToggle, onToggleBatch, onSubmit, onBack, lang 
}) => {
    const t = translations[lang];

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-indigo-600 mx-auto mb-4">
                    <ClipboardList className="w-7 h-7" />
                </div>
                <h2 className="font-bold text-slate-900 text-2xl md:text-3xl">{t.hypothesesPickTitle}</h2>
                <p className="text-slate-600 font-medium max-w-xl mx-auto text-sm md:text-base">{t.hypothesesPickSubtitle}</p>
                <p className="text-slate-500 font-medium text-xs md:text-sm max-w-xl mx-auto">Select at least 1 hypothesis per theory for best report quality</p>
            </div>

            <div className="space-y-10">
                {theories.map((theory, idx) => {
                    const theoryKey = Object.keys(theoriesHypotheses).find(k => k.toLowerCase().includes(theory.name.toLowerCase()) || theory.name.toLowerCase().includes(k.toLowerCase()));
                    const hyps = (theoryKey ? theoriesHypotheses[theoryKey] : theoriesHypotheses[theory.name]) || [];
                    
                    const allSelected = hyps.length > 0 && hyps.every(h => selectedHypotheses.includes(h));

                    return (
                        <div key={idx} className="bg-white rounded-card border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                            <div className={`bg-primary-light px-6 md:px-8 py-5 ${lang === 'ar' ? 'border-r-4' : 'border-l-4'} border-indigo-600 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                                <div className="flex items-center gap-3">
                                    <Book className="w-5 h-5 text-indigo-600" />
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-bold text-slate-800 text-sm md:text-base">
                                          {t.theoryAxiomsLabel} <span className="text-indigo-600">{theory.name}</span>
                                      </h3>
                                    </div>
                                </div>

                                {hyps.length > 0 && onToggleBatch && (
                                    <button
                                        onClick={() => onToggleBatch(hyps, !allSelected)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all border text-xs md:text-sm ${
                                            allSelected 
                                            ? "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100" 
                                            : "bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-100"
                                        }`}
                                    >
                                        {allSelected ? <ListX className="w-4 h-4" /> : <ListChecks className="w-4 h-4" />}
                                        <span>{allSelected ? t.deselectAll : t.selectAll}</span>
                                    </button>
                                )}
                            </div>
                            <div className="p-5 md:p-8 space-y-4">
                                {hyps.length > 0 ? (
                                    hyps.map((hyp, hIdx) => {
                                        const isSelected = selectedHypotheses.includes(hyp);
                                        return (
                                            <button
                                                key={hIdx}
                                                onClick={() => onToggle(hyp)}
                                                className={`w-full flex items-start gap-4 p-5 rounded-2xl border-2 transition-all text-justify relative group/item ${
                                                    isSelected
                                                    ? "bg-indigo-50 border-indigo-600 shadow-md"
                                                    : "bg-white border-slate-100 hover:border-indigo-200 hover:bg-slate-50/50"
                                                }`}
                                            >
                                                <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                                                    isSelected 
                                                    ? "bg-indigo-600 border-indigo-600 text-white scale-110 shadow-sm" 
                                                    : "border-slate-300 bg-white group-hover/item:border-indigo-400"
                                                }`}>
                                                    {isSelected && <Check className="w-4 h-4 animate-in zoom-in-50 duration-200" />}
                                                </div>
                                                <p className={`font-bold text-xs md:text-base leading-relaxed ${isSelected ? "text-indigo-900" : "text-slate-600"}`}>
                                                    {hyp}
                                                </p>
                                                {isSelected && (
                                                    <div className={`absolute top-2 ${lang === 'ar' ? 'left-2' : 'right-2'} md:top-3 ${lang === 'ar' ? 'md:left-3' : 'md:right-3'}`}>
                                                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div className="flex items-center gap-3 p-6 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700">
                                        <AlertCircle className="w-5 h-5" />
                                        <p className="font-bold text-sm">{t.hypothesisLoadError}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-8 pb-12 sticky bottom-0 bg-white/95 backdrop-blur-sm p-4 -mx-4 md:static md:bg-transparent md:backdrop-blur-none md:p-0">
                <div className="md:hidden">
                    <div className="text-center text-sm font-bold text-slate-600 mb-3">
                        {selectedHypotheses.length} hypothesis selected
                    </div>
                </div>
                <button
                    onClick={onBack}
                    className="w-12 h-12 p-0 rounded-2xl bg-white border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all flex items-center justify-center flex-shrink-0 active:scale-95 md:flex-1 md:w-auto md:h-auto md:px-8 md:py-4"
                >
                    {lang === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                    <span className="hidden md:inline">{t.backBtn}</span>
                </button>
                <button
                    onClick={onSubmit}
                    disabled={selectedHypotheses.length === 0}
                    className={`flex-1 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 ${
                        selectedHypotheses.length > 0
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                >
                    <Sparkles className="w-6 h-6" />
                    {t.generateReportBtn}
                    {selectedHypotheses.length > 0 && (
                        <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs ml-1">
                            {selectedHypotheses.length}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default StepHypothesesPicking;
