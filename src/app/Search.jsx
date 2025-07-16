'use client'

import React, {useState} from 'react';
import CardMenu from './CardMenu';

export default function Search({category, details, cardList, setCardList, enabledDomains, setEnabledDomains})
{
    const [searchField, setSearchField] = useState("");
    const [searchShow, setSearchShow] = useState(true);

    const filteredCards = details.filter(
        card => {
            return (
                card.name.toLowerCase().includes(searchField.toLowerCase())
            );
        }
    );

    const handleChange = e => {
        setSearchField(e.target.value);
        if(e.target.value != "")
        {
            setSearchShow(true);
        }
        /*if(e.target.value === "")
        {
            setSearchShow(false);
        }
        else
        {
            setSearchShow(true);
        }*/
    };

    function searchList() {
        //if(searchShow)
        //{
            return (
                <CardMenu category={category} filteredCards={filteredCards} searchShow={searchShow} setSearchShow={setSearchShow} cardList={cardList} setCardList={setCardList} enabledDomains={enabledDomains} setEnabledDomains={setEnabledDomains}/>
            );
        //}

    }

    return (
        <section>
            <div>
                <input type="search" placeholder={`Search ${category} Cards`} onChange={handleChange} />
            </div>
            {searchList()}
        </section>
    )
}