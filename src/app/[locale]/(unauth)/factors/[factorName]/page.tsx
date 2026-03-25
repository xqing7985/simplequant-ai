import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { Section } from '@/features/landing/Section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FactorHeader } from '@/features/factors/components/FactorHeader';
import { ResearchPerformance } from '@/features/factors/components/ResearchPerformance';
import { DedupResult } from '@/features/factors/components/DedupResult';
import { getFactorDetail } from '@/features/factors/services/factorDataService';

export async function generateMetadata(props: {
  params: { locale: string; factorName: string };
}) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Factors',
  });

  return {
    title: `${props.params.factorName} - ${t('meta_title')}`,
    description: t('meta_description'),
  };
}

const FactorDetailPage = async (props: {
  params: { locale: string; factorName: string };
}) => {
  const { locale, factorName } = props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Factors',
  });

  const detail = await getFactorDetail(factorName);

  if (!detail) {
    notFound();
  }

  return (
    <Section className="min-h-screen">
      <div className="space-y-8">
        {/* 头部信息 */}
        <FactorHeader detail={detail} />

        {/* Tabs */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="performance">{t('tabs.performance')}</TabsTrigger>
            <TabsTrigger value="dedup">{t('tabs.dedup')}</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="mt-6">
            <ResearchPerformance summary={detail.summary} />
          </TabsContent>

          <TabsContent value="dedup" className="mt-6">
            <DedupResult dedup={detail.dedup} />
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
};

export default FactorDetailPage;
