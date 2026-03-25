import { getTranslations } from 'next-intl/server';

import { Section } from '@/features/landing/Section';
import { FactorsClient } from '@/features/factors/components/FactorList';
import { safeGetFactorList } from '@/features/factors/services/factorDataService';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Factors',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const FactorsPage = async (props: { params: { locale: string } }) => {
  const { locale } = props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Factors',
  });

  const { data: factors, error } = await safeGetFactorList();

  return (
    <Section
      title={t('page_title')}
      description={t('page_description')}
      className="min-h-screen"
    >
      <FactorsClient factors={factors} error={error} />
    </Section>
  );
};

export default FactorsPage;
