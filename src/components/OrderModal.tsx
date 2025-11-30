import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import OfferModal from './OfferModal';

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ open, onOpenChange, onSuccess }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    agreeToTerms: false,
  });
  const [offerOpen, setOfferOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.address || !formData.agreeToTerms) {
      toast.error(t('order.error'));
      return;
    }

    // Here you would typically send the order to your backend
    toast.success(t('order.success'));
    onSuccess();
    onOpenChange(false);
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      agreeToTerms: false,
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">{t('order.title')}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t('order.fullName')}</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={t('order.fullName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t('order.phone')}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+998 XX XXX XX XX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{t('order.address')}</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder={t('order.address')}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeToTerms: checked as boolean })
                }
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('order.agreeToTerms')}
              </label>
            </div>

            <Button
              type="button"
              variant="link"
              className="px-0 text-primary"
              onClick={() => setOfferOpen(true)}
            >
              {t('order.viewOffer')}
            </Button>

            <Button type="submit" className="w-full">
              {t('order.submit')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <OfferModal open={offerOpen} onOpenChange={setOfferOpen} />
    </>
  );
};

export default OrderModal;
