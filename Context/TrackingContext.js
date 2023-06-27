import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT
import tracking from "./Tracking.json";
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

//FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);
};

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  //STATE VARIABLE
  const DappName = "Product Tracking App";
  const [currentUser, setCurrentUser] = useState(null);

  const createShipment = async (items) => {
    console.log(items);
    const { receiver, pickupTime, distance, price } = items;

    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        {
          value: ethers.utils.parseUnits(price, 18),
        },
      );
      createItem.wait();
      console.log(createItem);
    } catch (error) {
      console.log("Something went wrong while creating item", error);
    }
  };

  const getAllShipments = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const shipments = await contract.getAllTransactions();
      const allShipments = shipments.map((shipment) => {
        return {
          sender: shipment.sender,
          receiver: shipment.receiver,
          price: ethers.utils.formatEther(shipment.price.toString()),
          pickupTime: shipment.pickupTime.toNumber(),
          deliveryTime: shipment.deliveryTime.toNumber(),
          distance: shipment.distance.toNumber(),
          isPaid: shipment.isPaid,
          status: shipment.status,
        };
      });

      return allShipments;
    } catch (error) {
      console.log("Something went wrong while fetching items", error);
    }
  };

  const getShipmentCount = async () => {
    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentsCount = await contract.getShipmentCount(accounts[0]);
      return shipmentsCount.toNumber();
    } catch (error) {
      console.log("Something went wrong while getting shipment count", error);
    }
  };

  const completeShipment = async (completeShip) => {
    console.log(completeShip);
    const { receiver, index } = completeShip;
    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        {
          gasLimit: 300000,
        },
      );
      transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log("Something went wrong while completing shipment", error);
    }
  };

  const getShipment = async (index) => {
    console.log(index * 1);
    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipments = await contract.getShipment(accounts[0], index * 1);

      const singleShipment = {
        sender: shipments.sender,
        receiver: shipments.receiver,
        pickupTime: shipments.pickupTime.toNumber(),
        deliveryTime: shipments.deliveryTime.toNumber(),
        distance: shipments.distance.toNumber(),
        price: ethers.utils.formatEther(shipments.price.toString()),
        status: shipments.status,
        isPaid: shipments.isPaid,
      };
      return singleShipment;
    } catch (error) {
      console.log("Something went wrong while getting shipment", error);
    }
  };

  const startShipment = async (getProduct) => {
    const { receiver, index } = getProduct;
    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1,
        {
          gasLimit: 300000,
        },
      );

      shipment.wait();
      console.log(shipment);
    } catch (error) {
      console.log("Something went wrong while starting shipment", error);
    }
  };

  // CHECK WALLET CONNECTED
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) return setCurrentUser(accounts[0]);
      else return "No account found";
    } catch (error) {
      console.log(
        "Something went wrong while checking wallet connection",
        error,
      );
    }
  };

  // CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentUser(accounts[0]);
    } catch (error) {
      return "Something went wrong while connecting wallet";
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipments,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentCount,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
