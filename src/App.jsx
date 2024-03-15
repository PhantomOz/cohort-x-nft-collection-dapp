import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import AppTabs from "./component/AppTabs";
import useCollections from "./hooks/useCollections";
import useMyNfts from "./hooks/useMyNfts";

configureWeb3Modal();

function App() {
    const tokensData = useCollections();
    const myTokenIds = useMyNfts();

    const myTokensData = tokensData.filter((x, index) =>
        myTokenIds.includes(index)
    );
    return (
        <Container>
            <Header />
            <main className="mt-6">
                <AppTabs
                    MyNfts={
                        <Flex align="center" gap="8" wrap={"wrap"}>
                            {myTokensData.length === 0 ? (
                                <Text>No NFT owned yet</Text>
                            ) : (
                                myTokensData.map((x) => (
                                    <Box key={x.dna} className="w-[20rem]">
                                        <img
                                            src={x.image}
                                            className="w-full object-contain"
                                            alt={x.name}
                                        />
                                        <Text className="block text-2xl">
                                            Name: {x.name}
                                        </Text>
                                        <Text className="block">
                                            Description: {x.description}
                                        </Text>
                                        <Button className="px-8 py-2 text-xl mt-2">
                                            Mint
                                        </Button>
                                    </Box>
                                ))
                            )}
                        </Flex>
                    }
                    AllCollections={
                        <Flex align="center" gap="8" wrap={"wrap"}>
                            {tokensData.length === 0 ? (
                                <Text>Loading...</Text>
                            ) : (
                                tokensData.map((x) => (
                                    <Box key={x.dna} className="w-[20rem]">
                                        <img
                                            src={x.image}
                                            className="w-full object-contain"
                                            alt={x.name}
                                        />
                                        <Text className="block text-2xl">
                                            Name: {x.name}
                                        </Text>
                                        <Text className="block">
                                            Description: {x.description}
                                        </Text>
                                        <Button className="px-8 py-2 text-xl mt-2">
                                            Mint
                                        </Button>
                                    </Box>
                                ))
                            )}
                        </Flex>
                    }
                />
            </main>
        </Container>
    );
}

export default App;
