import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";
import axios from "axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {dummy} from "./dummy";


import "./OfferUser.css";
import Layout from "../../components/layout/Layout";

import { context } from "../../App";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function OfferUser() {
  const { userId, SetUserId } = useContext(context);
  // const [incomingOffers, setIncomingOffers] = useState([]);
  // const [outgoingOffers, setOutgoingOffers] = useState([]);
  // const [matchedOffers, setMatchedOffers] = useState([]);
  const [incomingOffers, setIncomingOffers] = useState(dummy.filter(offer => offer.status === 'Incoming'));
  const [outgoingOffers, setOutgoingOffers] = useState(dummy.filter(offer => offer.status === 'Outgoing'));
  const [matchedOffers, setMatchedOffers] = useState(dummy.filter(offer => offer.status === 'Matched'));
  
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleUser = (userId) => {
    navigate(`/profile-user/${userId}`);
  }

  const handleAccept = async (offerId) => {
    try {
      const response = await axios.put(`http://43.202.86.217/api/v1/offer/accept/${offerId}`);
      if (response.data.isSuccess) {
        fetchData();
      } else {
        console.error('Failed to accept the offer');
      }
    } catch (error) {
      console.error('An error occurred while accepting the offer:', error);
    }
  }

  const handleDetail = (offerId) => {
    // Navigate to the offer detail page
    navigate(`/offer-detail/${offerId}`);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Fetch data as before
  }, []);

  const renderOffers = (offers, status) => {
    return offers.map((offer) => (
      <ListItem key={offer.id}>
        <div>
          <h2>{offer.title}</h2>
          <p>{offer.description}</p>
          {status === 'Incoming' && (
            <Button variant="contained" color="primary" onClick={() => handleAccept(offer.id)}>
              Accept
            </Button>
          )}
          {status === 'Matched' && (
            <Button variant="contained" color="primary" onClick={() => handleDetail(offer.id)}>
              Detail
            </Button>
          )}
        </div>
      </ListItem>
    ));
  };

  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="받은 요청" />
            <Tab label="보낸 요청" />
            <Tab label="매칭 완료" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {renderOffers(incomingOffers, 'Incoming')}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {renderOffers(outgoingOffers, 'Outgoing')}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {renderOffers(matchedOffers, 'Matched')}
        </TabPanel>
      </Box>
    </Layout>
  );
}

export default OfferUser;