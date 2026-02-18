"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { CloudUpload, Wand2, Loader2, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function UploadWizard() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

    const handleUpload = () => {
        setLoading(true);
        // Simulate upload
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    const handleGenerate = () => {
        setLoading(true);
        // Simulate generation
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Steps Indicator */}
            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10 -translate-y-1/2" />
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= i ? "bg-purple-600 text-white" : "bg-black/40 border border-white/10 text-muted-foreground"
                            }`}
                    >
                        {i}
                    </div>
                ))}
            </div>

            <Card className="border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden min-h-[500px] flex flex-col">
                <CardContent className="p-8 flex-1 flex flex-col">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <CloudUpload className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Upload your photos</h2>
                                    <p className="text-muted-foreground">Select 10-20 selfies for best results</p>
                                </div>
                                <Button
                                    size="lg"
                                    onClick={handleUpload}
                                    disabled={loading}
                                    className="bg-purple-600 hover:bg-purple-700 min-w-[200px]"
                                >
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {loading ? "Uploading..." : "Select Files"}
                                </Button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex-1 flex flex-col space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-center mb-6">Choose a Style</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {["Professional", "Creative", "Cyberpunk", "Minimalist"].map((style) => (
                                        <div
                                            key={style}
                                            onClick={() => setSelectedStyle(style)}
                                            className={`aspect-square rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${selectedStyle === style
                                                    ? "border-purple-500 bg-purple-500/10"
                                                    : "border-white/10 bg-white/5 hover:border-white/20"
                                                }`}
                                        >
                                            {style}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end mt-auto pt-8">
                                    <Button
                                        size="lg"
                                        onClick={handleGenerate}
                                        disabled={loading || !selectedStyle}
                                        className="bg-gradient-to-r from-purple-600 to-pink-600"
                                    >
                                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                        {loading ? "Generating..." : "Generate Magic"}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                            >
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500">
                                    <Wand2 className="w-10 h-10" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Processing Started!</h2>
                                    <p className="text-muted-foreground max-w-md mx-auto">
                                        We are crafting your professional photos. This usually takes about 20-30 minutes. We'll email you when they're ready.
                                    </p>
                                </div>
                                <Button variant="outline" onClick={() => setStep(1)}>
                                    Start New Project
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}
