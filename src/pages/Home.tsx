import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Ruler, Package, Award, Play } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import VideoPlayer from '@/components/VideoPlayer';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { useRef } from 'react';

const Home = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: Shield,
      title: t('features.quality.title'),
      description: t('features.quality.desc'),
    },
    {
      icon: Ruler,
      title: t('features.size.title'),
      description: t('features.size.desc'),
    },
    {
      icon: Package,
      title: t('features.variety.title'),
      description: t('features.variety.desc'),
    },
    {
      icon: Award,
      title: t('features.experience.title'),
      description: t('features.experience.desc'),
    },
  ];

  const featuredProducts = [
    {
      id: 'pastel-1',
      name: t('products.pastel.name'),
      description: t('products.pastel.desc'),
      price: 200000,
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
  ];

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
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
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[600px] md:h-[700px] overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-cover bg-center scale-110"
          
        >
          <img 
            src="/images/hero-image.jpg" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/50" />
        </motion.div>
        
        <motion.div 
          style={{ opacity }}
          className="relative container mx-auto px-4 h-full flex items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl z-10"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.p
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/products">
                <Button size="lg" className="text-lg px-8 hover-lift glow-primary">
                  <Play className="h-5 w-5 mr-2" />
                  {t('hero.shopNow')}
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 hover-lift">
                  {t('hero.learnMore')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {t('video.title') || 'Experience the Quality'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('video.subtitle') || 'Watch how we create premium bedding that transforms your sleep experience'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <VideoPlayer
              src="/videos/product-showcase.mp4"
              poster="/images/hero-image.jpg"
              title="Muhabbat Pastellari - Premium Bedding"
              className="aspect-video"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
          >
            {t('features.title')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-card shadow-card hover-lift border border-border/50 backdrop-blur-sm"
              >
                <motion.div
                whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 glow-primary"
                >
                  <feature.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-xl font-heading font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {t('products.title')}
            </h2>
            <Link to="/products">
              <Button variant="link" className="text-lg">
                {t('products.viewAll')} →
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
      </section>
    </div>
  );
};

export default Home;
