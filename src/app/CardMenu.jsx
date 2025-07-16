'use client'

import React from 'react';
import Card from './Card';


export default function CardMenu({category, filteredCards, searchShow, setSearchShow, cardList, setCardList, enabledDomains, setEnabledDomains})
{

    const filtered = filteredCards.map(card => <Card category={category} key={card.path} card={card} searchShow={searchShow} setSearchShow={setSearchShow} cardList={cardList} setCardList={setCardList} enabledDomains={enabledDomains} setEnabledDomains={setEnabledDomains}/>)
    return (
        <div>
            {filtered}
        </div>
    )
}