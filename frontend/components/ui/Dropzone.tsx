
'use client';

import { useState, useCallback } from 'react';
import { Upload, File, Loader2, CheckCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dropzone() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setStatus('idle');
            setErrorMsg(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStatus('idle');
            setErrorMsg(null);
        }
    };

    const processFile = async () => {
        if (!file) return;
        setStatus('uploading');
        setErrorMsg(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            setStatus('processing');
            const response = await fetch('/api/strip', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.details || 'Processing failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setDownloadUrl(url);
            setStatus('completed');
        } catch (err: any) {
            console.error(err);
            setErrorMsg(err.message);
            setStatus('error');
        }
    };

    const reset = () => {
        setFile(null);
        setStatus('idle');
        setDownloadUrl(null);
        setErrorMsg(null);
    };

    return (
        <div className="w-full max-w-xl mx-auto p-6">
            <AnimatePresence mode="wait">
                {status === 'idle' || status === 'error' ? (
                    <motion.div
                        key="drop"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`border border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${status === 'error'
                            ? 'border-red-500/50 bg-red-500/5'
                            : 'border-neutral-700/50 hover:border-syncra-primary/50 hover:bg-syncra-primary/5'
                            }`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="p-4 bg-syncra-primary/20 rounded-full text-syncra-primary">
                                <Upload size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-white">Drag & Drop Image</h3>
                                <p className="text-neutral-500 text-sm font-light">Supports JPEG, PNG • Max 10MB</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                id="file-upload"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors"
                            >
                                Select File
                            </label>
                        </div>
                        {status === 'error' && (
                            <p className="text-red-500 mt-4 text-sm">{errorMsg}</p>
                        )}
                    </motion.div>
                ) : null}

                {file && status === 'idle' ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 flex flex-col items-center p-8 bg-neutral-900/50 rounded-2xl border border-neutral-800 w-full"
                    >
                        <File size={40} className="text-neutral-400 mb-2" />
                        <p className="font-mono text-sm mb-4">{file.name}</p>
                        <button
                            onClick={processFile}
                            className="w-full py-3 bg-syncra-primary text-white font-bold rounded-xl hover:bg-syncra-light transition-all shadow-[0_0_20px_rgba(58,0,228,0.3)]"
                        >
                            Remove Credentials
                        </button>
                    </motion.div>
                ) : null}

                {status === 'processing' || status === 'uploading' ? (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <Loader2 className="animate-spin text-syncra-primary mb-4" size={48} />
                        <p className="text-lg font-light text-neutral-300">
                            {status === 'uploading' ? 'Uploading...' : 'Stripping Metadata...'}
                        </p>
                    </motion.div>
                ) : null}

                {status === 'completed' && downloadUrl ? (
                    <motion.div
                        key="completed"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 text-green-500 rounded-full mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Clean.</h2>
                        <p className="text-neutral-400 mb-8">Your image is now free of attached credentials.</p>

                        <div className="flex gap-4 justify-center">
                            <a
                                href={downloadUrl}
                                download={`clean_${file?.name}`}
                                className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                            >
                                <Download size={20} />
                                Download
                            </a>
                            <button
                                onClick={reset}
                                className="px-8 py-3 border border-neutral-700 rounded-full hover:bg-neutral-800 transition-colors"
                            >
                                New File
                            </button>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div >
    );
}
