import { getTranslations } from 'next-intl/server';

import { datasets } from '@/data/datasets';
import { DatasetCard } from '@/features/data/DatasetCard';
import { Section } from '@/features/landing/Section';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Data',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const DataPage = async (props: { params: { locale: string } }) => {
  const { locale } = props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Data',
  });

  return (
    <Section
      title={t('page_title')}
      description={t('page_description')}
      className="min-h-screen"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {datasets.map(dataset => (
          <DatasetCard key={dataset.slug} dataset={dataset} />
        ))}
      </div>
    </Section>
  );
};

export default DataPage;
