import { ethers } from "ethers";
import erc721 from "../constants/erc721.json";
import multicallAbi from "../constants/multicall.json";
import { readOnlyProvider } from "../constants/providers";
import { useEffect, useMemo, useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useMyNfts = () => {
    const { address } = useWeb3ModalAccount();
    const [data, setData] = useState([]);
    const tokenIDs = useMemo(
        () => [...Array.from({ length: 30 })].map((_, index) => index),
        []
    );

    useEffect(() => {
        (async () => {
            const itf = new ethers.Interface(erc721);
            const calls = tokenIDs.map((x) => ({
                target: import.meta.env.VITE_contract_address,
                callData: itf.encodeFunctionData("ownerOf", [x]),
            }));

            const multicall = new ethers.Contract(
                import.meta.env.VITE_multicall_address,
                multicallAbi,
                readOnlyProvider
            );

            const callResults = await multicall.tryAggregate.staticCall(
                false,
                calls
            );

            const validResponsesIndex = [];
            const validResponses = callResults.filter((x, i) => {
                if (x[0] === true) {
                    validResponsesIndex.push(i);
                    return true;
                }
                return false;
            });

            const decodedResponses = validResponses.map((x) =>
                itf.decodeFunctionResult("ownerOf", x[1])
            );

            const ownedTokenIds = [];

            decodedResponses.forEach((addr, index) => {
                if (
                    String(addr).toLowerCase() === String(address).toLowerCase()
                )
                    ownedTokenIds.push(validResponsesIndex[index]);
            });

            setData(ownedTokenIds);
        })();
    }, [address, tokenIDs]);

    return data;
};

export default useMyNfts;
