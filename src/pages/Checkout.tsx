import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, CheckCircle, ArrowLeft, AlertTriangle, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
    const { cartItems, totalAmount, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState<'cart' | 'payment' | 'success'>('cart');

    const parsePrice = (priceStr: string | number): number => {
        if (typeof priceStr === 'number') return priceStr;
        return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        setStep('payment');
    };

    if (step === 'success') {
        return (
            <div className="pt-32 pb-20 min-h-screen bg-black flex flex-col items-center justify-center px-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-card p-12 rounded-[3rem] border border-gold-primary/30 text-center max-w-md w-full relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gold-primary animate-pulse"></div>
                    <div className="w-24 h-24 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold-primary/20">
                        <CheckCircle size={48} className="text-gold-primary" />
                    </div>
                    <h1 className="text-4xl font-impact text-white tracking-widest uppercase mb-4">Transmission Successful</h1>
                    <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-10 leading-relaxed">
                        Your frequency has been registered. The physical fragments of the legacy are being prepared for dispatch.
                    </p>
                    <button
                        onClick={() => navigate('/store')}
                        className="w-full btn-gold py-5 rounded-2xl font-impact tracking-[0.2em] text-lg hover:scale-105 transition-transform"
                    >
                        RETURN TO ARCHIVE
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black overflow-x-hidden">
            {/* Work in Progress Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container mx-auto px-6 max-w-6xl mb-8"
            >
                <div className="glass-card border-2 border-yellow-500/30 bg-yellow-500/5 p-6 rounded-2xl flex items-start gap-4">
                    <AlertTriangle size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                        <h3 className="text-yellow-500 font-impact text-lg tracking-wider uppercase mb-2">Payment System Under Construction</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Our secure payment gateway is currently being integrated. You can still browse and add items to your cart.
                            To place an order now, please contact us directly and we'll process your order manually.
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Column: Cart or Payment Form */}
                    <div className="flex-1 space-y-8">
                        {step === 'cart' ? (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                    <h1 className="text-4xl font-impact text-white tracking-widest uppercase">Your <span className="text-gold-primary">Haul</span></h1>
                                    <span className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em]">{cartItems.length} Items Detected</span>
                                </div>

                                {cartItems.length === 0 ? (
                                    <div className="glass-card p-20 rounded-[2.5rem] border border-white/5 text-center">
                                        <ShoppingBag size={64} className="text-gray-800 mx-auto mb-6 opacity-20" />
                                        <p className="text-gray-600 font-mono text-sm uppercase tracking-widest mb-8">No frequencies detected in your current payload.</p>
                                        <button onClick={() => navigate('/store')} className="text-gold-primary hover:text-gold-light font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mx-auto transition-colors">
                                            <ArrowLeft size={16} /> Explore Archive
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <AnimatePresence>
                                            {cartItems.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    layout
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="glass-card p-6 rounded-[2rem] border border-white/5 flex items-center gap-6 group hover:border-gold-primary/20 transition-all"
                                                >
                                                    <div className="w-24 h-24 bg-gradient-to-br from-gold-dark/10 to-transparent rounded-2xl overflow-hidden border border-white/5 flex-shrink-0">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <p className="text-[10px] text-gold-primary/60 font-mono uppercase tracking-widest">{item.category}</p>
                                                                <h3 className="text-lg font-impact text-white tracking-wider uppercase">{item.name}</h3>
                                                            </div>
                                                            <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                                                                <X size={18} />
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-between items-center mt-4">
                                                            <div className="flex items-center gap-4 bg-white/5 rounded-xl border border-white/5 p-1">
                                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gold-primary transition-colors"><Minus size={14} /></button>
                                                                <span className="text-xs font-mono text-white w-4 text-center">{item.quantity}</span>
                                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gold-primary transition-colors"><Plus size={14} /></button>
                                                            </div>
                                                            <p className="text-gold-primary font-impact text-xl tracking-tighter uppercase">UGX {(parsePrice(item.price) * item.quantity).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                    <button onClick={() => setStep('cart')} className="text-gold-primary hover:scale-110 transition-transform">
                                        <ArrowLeft size={24} />
                                    </button>
                                    <h1 className="text-4xl font-impact text-white tracking-widest uppercase">Order <span className="text-gold-primary">Request</span></h1>
                                </div>

                                {/* Contact Us Instead of Payment */}
                                <div className="glass-card p-12 rounded-[3rem] border border-gold-primary/20 space-y-8 text-center">
                                    <div className="w-20 h-20 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto border border-gold-primary/20">
                                        <Mail size={40} className="text-gold-primary" />
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-3xl font-impact text-white tracking-widest uppercase">Ready to <span className="text-gold-primary">Order?</span></h2>
                                        <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-lg mx-auto">
                                            Our automated payment system is currently being upgraded for enhanced security.
                                            Meanwhile, we're processing orders manually to ensure you don't miss out.
                                        </p>
                                    </div>

                                    <div className="glass-card bg-black/40 p-6 rounded-2xl border border-white/5 max-w-md mx-auto">
                                        <p className="text-[10px] font-mono text-gold-primary uppercase tracking-widest mb-3">Your Order Summary</p>
                                        <div className="space-y-2 text-left">
                                            {cartItems.map((item) => (
                                                <div key={item.id} className="flex justify-between text-sm">
                                                    <span className="text-gray-400">{item.quantity}x {item.name}</span>
                                                    <span className="text-white">UGX {(parsePrice(item.price) * item.quantity).toLocaleString()}</span>
                                                </div>
                                            ))}
                                            <div className="pt-3 border-t border-white/10 flex justify-between font-impact text-lg">
                                                <span className="text-gold-primary">TOTAL</span>
                                                <span className="text-gold-primary">UGX {totalAmount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate('/contact')}
                                        className="btn-gold px-12 py-6 rounded-2xl font-impact tracking-[0.2em] text-lg hover:scale-105 transition-transform inline-flex items-center gap-3"
                                    >
                                        <Mail size={20} />
                                        CONTACT US TO ORDER
                                    </button>

                                    <p className="text-[10px] text-gray-600 font-mono leading-relaxed">
                                        Include your order details when contacting us, and we'll guide you through the payment process.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:w-[400px]">
                        <div className="glass-card rounded-[3rem] border border-white/5 p-10 space-y-8 sticky top-32">
                            <h2 className="text-2xl font-impact text-white tracking-widest uppercase border-b border-white/5 pb-6">Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs font-mono">
                                    <span className="text-gray-500 uppercase">Subtotal Signal</span>
                                    <span className="text-white">UGX {totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-mono">
                                    <span className="text-gray-500 uppercase">Logistics (Shipping)</span>
                                    <span className="text-green-500 uppercase">Complimentary</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-mono">
                                    <span className="text-gray-500 uppercase">Refining Fee (Tax)</span>
                                    <span className="text-white">Included</span>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gold-primary/10 flex flex-col gap-1">
                                <span className="text-[10px] font-mono text-gold-dark uppercase tracking-widest">Total Valuation</span>
                                <div className="text-4xl font-impact text-gold-primary uppercase tracking-tighter">UGX {totalAmount.toLocaleString()}</div>
                            </div>

                            {step === 'cart' ? (
                                <button
                                    onClick={handleCheckout}
                                    disabled={cartItems.length === 0}
                                    className={`w-full py-6 rounded-2xl font-impact tracking-[0.2em] text-lg transition-all ${cartItems.length > 0 ? 'btn-gold shadow-gold hover:scale-105' : 'bg-gray-900 text-gray-600 cursor-not-allowed opacity-50'}`}
                                >
                                    INITIALIZE CHECKOUT
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="w-full py-6 rounded-2xl font-impact tracking-[0.2em] text-lg transition-all bg-gold-primary text-black border-2 border-gold-primary shadow-gold hover:scale-105"
                                >
                                    CONTACT US TO ORDER
                                </button>
                            )}

                            <div className="flex flex-col items-center gap-4 pt-4">
                                <p className="text-[8px] text-gray-600 font-mono text-center leading-relaxed">
                                    By finalizing, you agree to the Foundation's Archive Release Protocols and Heritage Terms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
