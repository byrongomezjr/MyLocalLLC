export type RootTabParamList = {
    MyLLC: undefined;
    Messages: undefined;
    Advertise: undefined;
    Settings: undefined;
};

export type RootStackParamList = {
    Main: undefined;
    BusinessDetail: { businessId: string };
    CreateBusiness: undefined;
    EditProfile: undefined;
    Chat: { businessId: string; businessName: string };
};
