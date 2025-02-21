import { useEffect, useState } from "react";
import Web3 from "web3";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

// GraphQL mutation to save user
const SAVE_USER = gql`
  mutation SaveUser($id: ID!, $address: String!) {
    saveUser(id: $id, address: $address) {
      id
      address
    }
  }
`;

// GraphQL query to fetch user data
const FETCH_USER_DATA = gql`
  query fetchUserData($address: String!) {
    user(address: $address) {
      id
      address
    }
  }
`;

const useWeb3 = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [isJoinActive, setJoin] = useState(false);
  const [error, setError] = useState(null);
  const [saveUser] = useMutation(SAVE_USER);
  const {
    data: userData,
    loading: userDataLoading,
    error: userDataError,
    refetch,
  } = useQuery(FETCH_USER_DATA, {
    skip: !userAddress,
    variables: { address: userAddress },
  });

  // Fetch user address from localStorage if available
  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      setUserAddress(savedAddress);
    }
  }, []);

  const initWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3Instance.eth.getAccounts();
        const userAccount = accounts[0];

        // Check if user is already in the system (Login or Join logic)
        const userExists = userData && userData.user;

        if (userExists) {
          // If the user already exists, this is a "Login"
          setUserAddress(userAccount);
          localStorage.setItem("userAddress", userAccount);
          console.log("User logged in!");
          refetch();
        } else {
          // If the user does not exist, this is a "Join"
          const userId = `${userAccount}_${Date.now()}`;
          await saveUser({
            variables: { id: userId, address: userAccount },
          });
          localStorage.setItem("userAddress", userAccount);
          setUserAddress(userAccount);
          console.log("User joined!");
        }
      } catch (error) {
        if (error.code === 4001) {
          setError("User denied account access");
        } else {
          setError("An error occurred");
          console.error(error);
        }
      }
    } else {
      setError(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const logoutWeb3 = () => {
    setUserAddress(null);
    localStorage.removeItem("userAddress");
    console.log("User disconnected!");
  };

  return {
    userAddress,
    userData,
    userDataLoading,
    userDataError,
    initWeb3,
    logoutWeb3,
    error,
    setJoin,
    isJoinActive,
  };
};

export default useWeb3;
