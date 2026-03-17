'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

export const Navbar = () => {
  const t = useTranslations('Navbar');
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'zh';

  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={(
          <>
            {/* PRO: Dark mode toggle button */}
            <li data-fade>
              <LocaleSwitcher />
            </li>
            <li className="ml-1 mr-2.5" data-fade>
              <Link href="/sign-in">{t('sign_in')}</Link>
            </li>
            <li>
              <Link className={buttonVariants()} href="/sign-up">
                {t('sign_up')}
              </Link>
            </li>
          </>
        )}
      >
        <ProductDropdown />

        <li>
          <Link href="/sign-up">{t('docs')}</Link>
        </li>

        <li>
          <Link href={`/${locale}/blog`}>{t('blog')}</Link>
        </li>

        <li>
          <Link href="/sign-up">{t('community')}</Link>
        </li>

        <li>
          <Link href="/sign-up">{t('company')}</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};

function ProductDropdown() {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations('Navbar');

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <li className="cursor-pointer">
          <span className="text-lg font-medium opacity-60 transition-opacity hover:opacity-100">
            {t('product')}
          </span>
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[160px]"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/data" className="flex w-full items-center py-2">
            数据
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
