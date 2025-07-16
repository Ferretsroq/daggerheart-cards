'use client'

import Image from "next/image";
import CardMenu from "./CardMenu";
import Search from "./Search";
import initialDetails from "./initialDetails";
//import cards from "./cardData";
import React, {useState, useRef, useEffect} from 'react';
import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import MyDocument from './PDFDocument';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import axios from 'axios';

export default function Home() {

  const menuCategories = [];
  const [cards, setCards] = useState({});
  const [cardList, setCardList] = useState([]);
  const [enabledDomains, setEnabledDomains] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/imageList').then((data) => {
      setCards(data.data);
    })
  }, []);
  const count = useRef(0);
  useEffect(() => {
    count.current++;
  }, [cardList]);
  
  for(let categoryIndex = 0; categoryIndex < Object.keys(cards).length; categoryIndex++)
  {
    let categoryName = Object.keys(cards)[categoryIndex];
    let categoryCards = cards[categoryName];
    if(categoryName === 'Domains')
    {
      categoryCards = [];
      for(let domainIndex = 0; domainIndex < enabledDomains.length; domainIndex++)
      {
        categoryCards = [...categoryCards, ...cards['Domains'][enabledDomains[domainIndex]]];
      }
    }
    const config = {direction: "vertical"}
    menuCategories.push(<div key={categoryIndex} style={{height: '500px', overflowY: 'scroll'}}> 
    <Search category={categoryName} details={categoryCards} cardList={cardList} setCardList={setCardList} enabledDomains={enabledDomains} setEnabledDomains={setEnabledDomains}/>
    </div>);
  }


  return (
    <div>
      <PanelGroup direction="horizontal" style={{height: "100vh"}}>
        <Panel defaultSize={25} maxSize={75}>
          <div>
            <PDFDownloadLink key={count.current} document={<MyDocument data={cardList}/>} fileName="foo.pdf">
            {({blob, url, loading, error}) => loading ? 'Loading document...' : 'Download now!'}
            </PDFDownloadLink>
          </div>
          <div className="search-container">
            {menuCategories}
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={25} maxSize={75}>
          <PDFViewer key={count.current} style={{width: "100vw", height: "100vh"}}>
            <MyDocument data={cardList} />
          </PDFViewer>
        </Panel>
      </PanelGroup>
    </div>
  );
}
