import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t('about.story'),
      content: t('about.storyContent'),
    },
    {
      title: t('about.mission'),
      content: t('about.missionContent'),
    },
    {
      title: t('about.quality'),
      content: t('about.qualityContent'),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/about-bg.jpg)" }}
        >
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-bold text-center"
          >
            {t('about.title')}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary">
                {section.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-8 rounded-lg bg-gradient-hero border"
          >
            <div className="text-center">
              <h3 className="text-2xl font-heading font-bold mb-4">
                Muhabbat Pastellari
              </h3>
              <p className="text-muted-foreground mb-2">
                {t('about.storyContent').split('.')[0]}
              </p>
              <p className="text-sm text-muted-foreground">
                2021 - {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
