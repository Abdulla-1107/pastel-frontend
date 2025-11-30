import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Check, Play } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import VideoPlayer from '@/components/VideoPlayer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart } = useCart();

  // Mock product data - in real app, fetch from API
  const products: Record<string, any> = {
    'pastel-1': {
      id: 'pastel-1',
      name: t('products.pastel.name'),
      description: t('products.pastel.desc'),
      price: 200000,
      image: '/images/pastel-product.jpg',
      video: '/videos/product-showcase.mp4',
      features: [
        t('features.quality.desc'),
        t('features.size.desc'),
        'Long-lasting durability',
        'Soft and comfortable texture',
      ],
    },
    'super-satin-2p': {
      id: 'super-satin-2p',
      name: `${t('products.superSatin.name')} - ${t('products.superSatin.twoPersonSet')}`,
      description: t('products.superSatin.desc'),
      price: 350000,
      image: '/images/super-satin.jpg',
      video: '/videos/product-showcase.mp4',
      variant: '2-person',
      features: [
        t('features.quality.desc'),
        'No shrinkage',
        'Color-fast technology',
        'Premium 2-person set',
      ],
    },
    'super-satin-1p': {
      id: 'super-satin-1p',
      name: `${t('products.superSatin.name')} - ${t('products.superSatin.onePersonSet')}`,
      description: t('products.superSatin.desc'),
      price: 250000,
      image: '/images/super-satin.jpg',
      video: '/videos/product-showcase.mp4',
      variant: '1-person',
      features: [
        t('features.quality.desc'),
        'No shrinkage',
        'Color-fast technology',
        'Perfect 1-person set',
      ],
    },
  };

  const product = products[id || ''] || products['pastel-1'];

  const handleAddToCart = () => {
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
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('cart.continueShopping')}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Media Section - Image & Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {product.video ? (
              <Tabs defaultValue="image" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="video">
                    <Play className="h-4 w-4 mr-2" />
                    Video
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="image" className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-soft hover-lift"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </TabsContent>
                <TabsContent value="video" className="mt-4">
                  <VideoPlayer
                    src={product.video}
                    poster={product.image}
                    title={product.name}
                    className="aspect-square"
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-lg overflow-hidden shadow-soft hover-lift"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="py-6 border-y">
              <span className="text-4xl font-bold text-primary">
                {product.price.toLocaleString()} UZS
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-heading font-semibold mb-4">
                {t('features.title')}
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={handleAddToCart}
                className="flex-1 text-lg py-6 hover-lift glow-primary"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t('products.addToCart')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
