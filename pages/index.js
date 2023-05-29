import React, { useState, useEffect, useContext } from "react";

import {
  Table,
  Form,
  Services,
  Profile,
  GetShipment,
  CompleteShipment,
  StartShipment,
} from "@/Components";

import { TrackingContext } from "@/Context/TrackingContext";

const index = () => {
  const {
    currentUser,
    getAllShipments,
    createShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentCount,
  } = useContext(TrackingContext);

  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModal, setGetModal] = useState(false);

  const [allShipmentsdata, setAllShipmentsdata] = useState();

  useEffect(() => {
    const getCampaignData = getAllShipments();

    return async () => {
      const allData = await getCampaignData;

      setAllShipmentsdata(allData);
    };
  }, []);

  return (
    <>
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModal={setGetModal}
        setStartModal={setStartModal}
      />
      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsdata={allShipmentsdata}
      />
      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentCount={getShipmentCount}
      />
      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />

      <GetShipment
        getModal={getModal}
        setGetModal={setGetModal}
        getShipment={getShipment}
      />

      <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      />
    </>
  );
};

export default index;
