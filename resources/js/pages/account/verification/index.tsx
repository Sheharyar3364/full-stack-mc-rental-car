import { useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Layout } from "@/components/frontend/layout";
import { ShieldCheck, Upload, FileText, CheckCircle2, AlertCircle, Clock, XCircle, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Document {
    id: number;
    type: string;
    path: string;
    original_filename: string;
    status: 'pending' | 'verified' | 'rejected';
    created_at: string;
    verified_at?: string;
    rejection_reason?: string;
}

interface Requirement {
    type: string;
    label: string;
    description: string;
}

const requirements: Requirement[] = [
    { type: 'license_front', label: 'Driver License (Front)', description: 'Clear photo of the front of your valid driver license.' },
    { type: 'license_back', label: 'Driver License (Back)', description: 'Clear photo of the back of your valid driver license.' },
    { type: 'passport', label: 'Passport / ID', description: 'Photo page of your passport or front of your national ID.' },
];

export default function VerificationCenter({ documents }: { documents: Document[] }) {
    const { auth } = usePage().props as any;

    const findDoc = (type: string) => documents.find(d => d.type === type);

    return (
        <Layout>
            <div className="bg-[#050505] min-h-screen text-white pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-10">
                        <Link href="/account" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tight">Identity Verification</h1>
                            <p className="text-white/40">Securely upload your documents to unlock premium rentals.</p>
                        </div>
                    </div>

                    {/* Status Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ShieldCheck className="w-8 h-8 text-secondary mb-4" />
                            <h3 className="font-bold text-lg mb-1">Secure Storage</h3>
                            <p className="text-sm text-white/40">Your data is encrypted and stored in a private, offline server.</p>
                        </div>
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
                            <CheckCircle2 className="w-8 h-8 text-green-500 mb-4" />
                            <h3 className="font-bold text-lg mb-1">Instant Review</h3>
                            <p className="text-sm text-white/40">Most documents are reviewed by our team within 2 hours.</p>
                        </div>
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
                            <AlertCircle className="w-8 h-8 text-blue-500 mb-4" />
                            <h3 className="font-bold text-lg mb-1">Global Standards</h3>
                            <p className="text-sm text-white/40">Compliant with Belgian and EU rental regulations.</p>
                        </div>
                    </div>

                    {/* Requirements List */}
                    <div className="space-y-6">
                        {requirements.map((req) => (
                            <UploadCard
                                key={req.type}
                                requirement={req}
                                document={findDoc(req.type)}
                            />
                        ))}

                        {/* Optional Proof of Address */}
                        <UploadCard
                            requirement={{ type: 'proof_of_address', label: 'Proof of Address (Optional)', description: 'Utility bill or bank statement (dated within 3 months).' }}
                            document={findDoc('proof_of_address')}
                        />
                    </div>

                </div>
            </div>
        </Layout>
    );
}

function UploadCard({ requirement, document }: { requirement: Requirement, document?: Document }) {
    const { data, setData, post, processing, progress, reset, errors } = useForm({
        type: requirement.type,
        file: null as File | null,
    });

    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setData('file', e.dataTransfer.files[0]);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/account/verification', {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 relative overflow-hidden w-full">
            {/* Background Status Indicator */}
            <div className={cn(
                "absolute left-0 top-0 bottom-0 w-1 transition-colors",
                document?.status === 'verified' ? "bg-green-500" :
                    document?.status === 'rejected' ? "bg-red-500" :
                        document?.status === 'pending' ? "bg-yellow-500" : "bg-white/10"
            )} />

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold">{requirement.label}</h3>
                        {document?.status && (
                            <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                document.status === 'verified' ? "bg-green-500/10 text-green-500 border border-green-500/20" :
                                    document.status === 'rejected' ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                                        "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                            )}>
                                {document.status}
                            </span>
                        )}
                    </div>
                    <p className="text-white/40 text-sm max-w-lg">{requirement.description}</p>

                    {document?.status === 'rejected' && (
                        <div className="mt-4 p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                            <p className="text-red-400 text-sm flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5" />
                                <span>Rejection Reason: {document.rejection_reason}</span>
                            </p>
                        </div>
                    )}
                </div>

                <div className="w-full md:w-auto min-w-[300px]">
                    {document && document.status !== 'rejected' ? (
                        <div className="h-32 rounded-xl bg-white/[0.02] border border-white/10 flex items-center p-4 gap-4">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                                <FileText className="w-6 h-6 text-white/40" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{document.original_filename}</p>
                                <p className="text-xs text-white/30 pt-1">Uploaded on {new Date(document.created_at).toLocaleDateString()}</p>
                            </div>
                            {document.status === 'verified' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                            {document.status === 'pending' && <Clock className="w-6 h-6 text-yellow-500" />}
                        </div>
                    ) : (
                        <form onSubmit={submit} className="relative group">
                            <div
                                className={cn(
                                    "h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer relative z-10",
                                    isDragging ? "border-secondary bg-secondary/5" : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]",
                                    errors.file ? "border-red-500" : ""
                                )}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                />

                                {data.file ? (
                                    <div className="text-center px-4">
                                        <FileText className="w-6 h-6 mx-auto mb-2 text-secondary" />
                                        <p className="text-sm text-white truncate max-w-[200px]">{data.file.name}</p>
                                        <button type="button" onClick={(e) => { e.preventDefault(); setData('file', null); }} className="text-xs text-red-500 mt-2 z-20 relative hover:underline">Remove</button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Upload className={cn("w-6 h-6 mx-auto mb-2 text-white/30 transition-colors", isDragging && "text-secondary")} />
                                        <p className="text-xs text-white/40 font-bold uppercase tracking-widest">
                                            {isDragging ? 'Drop File Here' : 'Click to Upload'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {data.file && (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    disabled={processing}
                                    type="submit"
                                    className="absolute -bottom-12 right-0 left-0 h-10 bg-secondary rounded-lg flex items-center justify-center text-xs font-black uppercase tracking-widest text-white shadow-lg hover:bg-secondary/90 transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Encrypting & Uploading...' : 'Confirm Upload'}
                                </motion.button>
                            )}

                            {progress && (
                                <div className="absolute top-0 left-0 h-1 bg-secondary transition-all duration-300" style={{ width: `${progress.percentage}%` }} />
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
