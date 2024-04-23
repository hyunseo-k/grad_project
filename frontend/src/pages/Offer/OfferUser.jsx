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
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [detailsButtonClickedOfferId, setDetailsButtonClickedOfferId] = useState(null);


  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/member/${id}`);
      return response.data.result;
    } catch (error) {
      console.error('An error occurred while fetching the user:', error);
    }
  };

  const OfferUser2 = ({ offer }) => {
    const [senderNickname, setSenderNickname] = React.useState('');
    const [receiverNickname, setReceiverNickname] = React.useState('');
  
    React.useEffect(() => {
      getUserById(offer.sender_id).then(user => setSenderNickname(user.nickname));
      getUserById(offer.receiver_id).then(user => setReceiverNickname(user.nickname));
    }, [offer]);
  
    return (
      <h2 style={{fontSize: 30}}>{senderNickname}님 ➡️ {receiverNickname}님</h2>
    );
  };

  const OfferUser3 = ({ currentUserId, offerId }) => {
    const [offerDetails, setOfferDetails] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
  
    useEffect(() => {
      const fetchOfferDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/offer/${offerId}`);
          setOfferDetails(response.data.result);
        } catch (error) {
          console.error('An error occurred while fetching the offer details:', error);
        }
      };
  
      fetchOfferDetails();
    }, [currentUserId]);
  
    useEffect(() => {
      const fetchUserDetails = async (userId) => {
        try {
          const response = await axios.get(`http://localhost:8000/member/${userId}`);
          setUserDetails(response.data.result);
        } catch (error) {
          console.error('An error occurred while fetching the user details:', error);
        }
      };
  
      if (offerDetails) {
        if (offerDetails.sender_id === currentUserId) {
          fetchUserDetails(offerDetails.receiver_id);
        } else if (offerDetails.receiver_id === currentUserId) {
          fetchUserDetails(offerDetails.sender_id);
        }
      }
    }, [offerDetails, currentUserId]);

    useEffect(() => {
      console.log(userDetails);
    }, [userDetails]);
  
    if (!offerDetails || !userDetails) {
      return null;
    }
  
    return (
      <div>
        {offerDetails.sender_id === currentUserId && <p>상대의 이메일: {userDetails.id}</p>}
        {offerDetails.receiver_id === currentUserId && <p>상대의 이메일: {userDetails.id}</p>}
      </div>
    );
  };


  useEffect(() => {
    const fetchData = async () => {
      let url;
      switch (value) {
        case 0:
          url = `http://localhost:8000/incoming/${userId}`;
          break;
        case 1:
          url = `http://localhost:8000/outgoing/${userId}`;
          break;
        case 2:
          url = `http://localhost:8000/matched/${userId}`;
          break;
        default:
          return;
      }
  
      try {
        const response = await axios.get(url);
        if (response.data.isSuccess) {
          console.log(response.data.data[0])
          switch (value) {
            case 0:
              setIncomingOffers(response.data.data);
              break;
            case 1:
              setOutgoingOffers(response.data.data);
              break;
            case 2:
              setMatchedOffers(response.data.data);
              break;
            default:
              return;
          }
        } else {
          console.error('Failed to fetch the offers');
        }
      } catch (error) {
        console.error('An error occurred while fetching the offers:', error);
      }
    };
  
    fetchData();
  }, [value]);

  const handleUser = (userId) => {
    navigate(`/profile-user/${userId}`);
  }

  const handleAccept = async (offerId) => {
    try {
      const response = await axios.put(`http://localhost:8000/offer-accept/${offerId}`);
      if (response.data.isSuccess) {
        fetchData();
        alert('성공적으로 수락되었습니다.');
      } else {
        console.error('Failed to accept the offer');
        alert('성공적으로 수락되었습니다.');
      }
    } catch (error) {
      console.error('An error occurred while accepting the offer:', error);
      alert('성공적으로 수락되었습니다.');
    }
  }


  const [offerDetails, setOfferDetails] = React.useState(null);

  const handleDetail = async (offerId) => {
    setSelectedOfferId(offerId);
    setDetailsButtonClickedOfferId(offerId);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Fetch data as before
  }, []);

  const renderOffers = (offers, status) => {
    const validOffers = offers.flat().filter(offer => offer && offer.offer_id);
    console.log(validOffers);
    return validOffers.map((offer) => (
      <ListItem key={offer.offer_id}>
        <div className="offer-block">
          <div>
            <OfferUser2 offer={offer} />
            {status === 'Matched' && offer.offer_id === detailsButtonClickedOfferId && <OfferUser3 currentUserId={userId} offerId={selectedOfferId}/>}
            {/* {status === 'Outgoing' && <h2 style={{fontSize: 30}}>{offer.receiver_id}님께 보낸 요청</h2>}
            {status === 'Incoming' && <h2 style={{fontSize: 30}}>{offer.sender_id}님께 받은 요청</h2>}
            {status === 'Matched' && <h2 style={{fontSize: 30}}>{offer.sender_id}님 ➡️ {offer.receiver_id}님</h2>} */}
            {/* <h2 style={{fontSize: 30}}>{offer.receiver_id}님께 보낸 요청</h2> */}
            <p style={{fontSize: 20}}>{offer.created_at}</p>
            {status === 'Outgoing' && <p style={{fontSize: 20, fontFamily: 'C24'}}>아직 매칭되지 않았어요.</p>}
            {status === 'Incoming' && <p style={{fontSize: 20, fontFamily: 'C24'}}>매칭 대기중이에요.</p>}
            {status === 'Matched' && <p style={{fontSize: 20, fontFamily: 'C24'}}>매칭이 완료되었어요.</p>}
          </div>
          {status === 'Incoming' && (
            <Button className="detailaccept" variant="contained" onClick={() => handleAccept(offer.offer_id)} sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#304D30' }, width: '20%', height: '50px', fontFamily: 'PADO', fontSize: 18 }}>
              수락하기
            </Button>
          )}
          {status === 'Matched' && (
            <Button className="detailaccept" variant="contained" onClick={() => handleDetail(offer.offer_id)} sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#304D30' }, width: '20%', height: '50px', fontFamily: 'PADO', fontSize: 18 }}>
              상세보기
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
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          sx={{ backgroundColor: '#163020', borderRadius: '10px', padding: '10px'}}
        >
          <Tab 
            label="받은 요청" 
            sx={{ color: 'white', fontFamily: 'PADO', fontSize: 22}} 
          />
          <Tab 
            label="보낸 요청" 
            sx={{ color: 'white', fontFamily: 'PADO', fontSize: 22}} 
          />
          <Tab 
            label="매칭 완료" 
            sx={{ color: 'white', fontFamily: 'PADO', fontSize: 22}} 
          />
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