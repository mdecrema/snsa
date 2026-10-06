import { getDictionary } from "@/lib/internalization";
import PageHeader from "@/src/components/ui/PageHeader/page";
import ContactsClientDirectory from "@/src/features/contacts/components/ContactsClientDirectory";

export default async function Contacts() {
    const dict = await getDictionary();

    const title = dict.contacts?.pageHeader?.title
    const subtitle = dict.contacts?.pageHeader?.subtitle
    const description = dict.contacts?.pageHeader?.description

    return (
        <>
            <PageHeader
                title={title}
                subtitle={subtitle}
                description={description}
                quickActions={[
                    { label: 'Annual Meeting', href: '/annual-meeting', variant: 'outlined' },
                    { label: 'Past Events', href: '/past-events', variant: 'outlined' },
                    { label: 'Register', href: '/past-events', variant: 'outlined' },
                    { label: 'Companies', href: '/past-events', variant: 'outlined' },
                ]}
            />
            <ContactsClientDirectory />
        </>
    )
}