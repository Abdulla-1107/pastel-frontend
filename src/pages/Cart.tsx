import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import OrderModal from '@/components/OrderModal';

const Cart = () => {
  const { t } = useTranslation();
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const handleCheckout = () => {
    setOrderModalOpen(true);
  };

  const handleOrderSuccess = () => {
    clearCart();
  };

  console.log(items);
  

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-3xl font-heading font-bold mb-4">
            {t('cart.empty')}
          </h2>
          <Link to="/products">
            <Button size="lg">{t('cart.continueShopping')}</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-heading font-bold mb-8"
        >
          {t('cart.title')}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-card flex flex-col sm:flex-row gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg"
                />
                
                <div className="flex-grow">
                  <h3 className="text-xl font-heading font-semibold mb-2">
                    {item.name}
                  </h3>
                  {item.variant && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.variant}
                    </p>
                  )}
                  <p className="text-lg font-bold text-primary">
                    {item.price.toLocaleString()} UZS
                  </p>
                </div>

                <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-4">
                  <div className="flex items-center gap-2 border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-lg p-6 shadow-card sticky top-24">
              <h2 className="text-2xl font-heading font-bold mb-6">
                {t('cart.total')}
              </h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      {(item.price * item.quantity).toLocaleString()} UZS
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>{t('cart.total')}</span>
                  <span className="text-primary">
                    {totalPrice.toLocaleString()} UZS
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full text-lg py-6"
                size="lg"
              >
                {t('cart.checkout')}
              </Button>

              <Link to="/products">
                <Button variant="outline" className="w-full mt-4">
                  {t('cart.continueShopping')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <OrderModal
        open={orderModalOpen}
        onOpenChange={setOrderModalOpen}
        onSuccess={handleOrderSuccess}
      />
    </div>
  );
};

export default Cart;
