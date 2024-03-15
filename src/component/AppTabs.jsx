import { Box, Tabs } from "@radix-ui/themes";

const AppTabs = ({ MyNfts, AllCollections }) => {
    return (
        <Tabs.Root defaultValue="account">
            <Tabs.List>
                <Tabs.Trigger value="account">My NFTs</Tabs.Trigger>
                <Tabs.Trigger value="documents">All Collections</Tabs.Trigger>
            </Tabs.List>

            <Box px="4" pt="3" pb="2">
                <Tabs.Content value="account">{MyNfts}</Tabs.Content>

                <Tabs.Content value="documents">{AllCollections}</Tabs.Content>
            </Box>
        </Tabs.Root>
    );
};

export default AppTabs;
