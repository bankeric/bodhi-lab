import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const CheckoutForm = ({ amount, onSuccess, onCancel }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/platform?donation=success",
      },
    });

    setIsProcessing(false);

    if (error) {
      toast({
        title: "Cúng dường không thành công",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Cúng dường thành công",
        description: "Cảm ơn lòng từ bi của bạn 🙏",
      });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-br from-[#EFE0BD]/30 to-[#E5D5B7]/20 rounded-2xl p-6 border border-[#8B4513]/20">
        <div className="text-center mb-4">
          <p className="font-serif text-sm text-[#8B4513]/70 mb-2">Số tiền cúng dường</p>
          <p className="font-serif text-3xl font-bold text-[#991b1b]">
            {amount.toLocaleString('vi-VN')} đ
          </p>
        </div>
      </div>

      <div className="bg-white/50 rounded-2xl p-6 border border-[#8B4513]/20">
        <PaymentElement />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 px-6 py-3 bg-white/70 text-[#8B4513] font-serif font-semibold rounded-full border-2 border-[#8B4513]/20 hover:bg-[#8B4513]/10 transition-all duration-300 disabled:opacity-50"
          data-testid="button-cancel-donation"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-[#991b1b] to-[#7a1515] text-white font-serif font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
          data-testid="button-confirm-donation"
        >
          {isProcessing ? "Đang xử lý..." : "Xác nhận cúng dường"}
        </button>
      </div>

      <p className="font-serif text-xs text-center text-[#8B4513]/60 italic">
        Giao dịch được bảo mật bởi Stripe. Thông tin thanh toán của bạn được mã hóa và an toàn.
      </p>
    </form>
  );
};

interface DonationCheckoutProps {
  isOpen: boolean;
  amount: number;
  clientSecret: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DonationCheckout({ isOpen, amount, clientSecret, onClose, onSuccess }: DonationCheckoutProps) {
  if (!isOpen || !clientSecret) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-testid="modal-donation-checkout">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-gradient-to-br from-[#EFE0BD] to-[#E5D5B7] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#8B4513]/30">
        <div className="sticky top-0 bg-gradient-to-br from-[#EFE0BD] to-[#E5D5B7] border-b-2 border-[#8B4513]/20 px-8 py-6 flex items-center justify-between backdrop-blur-sm">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#991b1b]">
              Hồi Hướng Công Đức
            </h2>
            <p className="font-serif text-sm text-[#8B4513]/70 italic mt-1">
              Complete your offering with secure payment
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 flex items-center justify-center transition-all duration-300"
            data-testid="button-close-checkout"
          >
            <X className="w-5 h-5 text-[#8B4513]" />
          </button>
        </div>

        <div className="px-8 py-6">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm amount={amount} onSuccess={onSuccess} onCancel={onClose} />
          </Elements>
        </div>
      </div>
    </div>
  );
}
