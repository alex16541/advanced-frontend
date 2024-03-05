import {
    EditableProfileCard,
} from '@/features/EditableProfileCard';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';

const ProfilePage = () => {
    const { id: profileId } = useParams<{ id: string }>();

    return (
        <Page>
            <EditableProfileCard profileId={profileId} />
        </Page>
    );
};

export default ProfilePage;
