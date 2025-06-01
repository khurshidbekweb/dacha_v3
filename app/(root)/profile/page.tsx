import ProfilePage from '@/section/profile/profile-page';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Profile | DachaOL",
    description: "Reginter in this page",
};


const Profile = () => {
    return <ProfilePage />
};

export default Profile;