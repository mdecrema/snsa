import { db } from '@/lib/db';
import { getDictionary } from '@/lib/internalization';
import PageHeaderBanner from '@/src/components/layout/PageHeaderBanner/page';
import MembershipClientDirectory from '@/src/features/membership/components/MembershipClientDirectory';
import GuestRegisterForm from '@/src/features/membership/components/page';

export default async function Membership() {
  const dict = await getDictionary();

  return (
    <>
    <MembershipClientDirectory dict={dict.membership} />
    <GuestRegisterForm />
    </>
  );
}