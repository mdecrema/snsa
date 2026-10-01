import QualityMarkClientDirectory from '@/src/features/qualityMark/components/QualityMarkClientDirectory';
import { getDictionary } from '@/lib/internalization';


export default async function QualityMark() {
  const dict = await getDictionary();

  return (
      <QualityMarkClientDirectory dict={dict.qualityMark} />
  );}