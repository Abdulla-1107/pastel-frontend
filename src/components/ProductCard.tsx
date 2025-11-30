import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  onAddToCart,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="overflow-hidden h-full flex flex-col shadow-card hover-lift border border-border/50 group">
        <Link to={`/product/${id}`}>
          <div className="relative overflow-hidden aspect-square bg-muted/20">
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth glow-primary">
                <span className="text-primary text-sm font-semibold">View</span>
              </div>
            </motion.div>
          </div>
        </Link>
        
        <CardContent className="p-6 flex-grow">
          <Link to={`/product/${id}`}>
            <h3 className="text-xl font-heading font-semibold mb-2 hover:text-primary transition-smooth group-hover:translate-x-1">
              {name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          <div className="mt-4">
            <motion.span 
              className="text-2xl font-bold text-primary"
              whileHover={{ scale: 1.05 }}
            >
              {price.toLocaleString()} UZS
            </motion.span>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex gap-2">
          <Link to={`/product/${id}`} className="flex-1">
            <Button variant="outline" className="w-full hover-lift">
              {t('products.viewDetails')}
            </Button>
          </Link>
          <Button onClick={onAddToCart} className="flex-1 hover-lift glow-primary">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {t('products.addToCart')}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
