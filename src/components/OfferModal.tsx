import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OfferModal: React.FC<OfferModalProps> = ({ open, onOpenChange }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">{t('offer.title')}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="mt-4 max-h-[60vh]">
          <div className="pr-4 space-y-4 text-sm text-muted-foreground whitespace-pre-line">
            {t('offer.content')}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OfferModal;
