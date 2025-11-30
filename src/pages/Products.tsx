import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Products = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const products = [
    {
      id: 'pastel-1',
      name: t('products.pastel.name'),
      description: t('products.pastel.desc'),
      price: 200000,
      image: '/images/pastel-product.jpg',
    },
    {
      id: 'pastel-2',
      name: `${t('products.pastel.name')} - Variant 2`,
      description: t('products.pastel.desc'),
      price: 220000,
      image: '/images/pastel-product.jpg',
    },
    {
      id: 'pastel-3',
      name: `${t('products.pastel.name')} - Variant 3`,
      description: t('products.pastel.desc'),
      price: 230000,
      image: '/images/pastel-product.jpg',
    },
    {
      id: 'super-satin-2p',
      name: `${t('products.superSatin.name')} - ${t('products.superSatin.twoPersonSet')}`,
      description: t('products.superSatin.desc'),
      price: 350000,
      image: '/images/super-satin.jpg',
      variant: '2-person',
    },
    {
      id: 'super-satin-1p',
      name: `${t('products.superSatin.name')} - ${t('products.superSatin.onePersonSet')}`,
      description: t('products.superSatin.desc'),
      price: 250000,
      image: '/images/super-satin.jpg',
      variant: '1-person',
    },
    {
      id: 'super-satin-3',
      name: `${t('products.superSatin.name')} - Premium`,
      description: t('products.superSatin.desc'),
      price: 400000,
      image: '/images/super-satin.jpg',
      variant: 'premium',
    },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: product.variant,
    });
    toast.success(t('products.addToCart'));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4">
            {t('products.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                {...product}
                onAddToCart={() => handleAddToCart(product)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
