'use client'

import React, {useState} from 'react'
import {useFloating, useHover, useInteractions, computePosition} from "@floating-ui/react"

export default function Card({category, card, searchShow, setSearchShow, cardList, setCardList, enabledDomains, setEnabledDomains})
{
    const [isClicked, setIsClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'right'
    });

    const hover = useHover(context);
    const {getReferenceProps, getFloatingProps} = useInteractions([
        hover,
      ]);
    const path = card.path;
    const name = card.name;
    //const path = `/data/Cards/${category}/${card.name}.png`
    function SubclassDomains(subName, domain0, domain1)
    {
        if(card.name.includes(subName) && !cardList.map(path => card.path).includes(path))
        {
            setEnabledDomains([...enabledDomains, domain0, domain1]);
        }
        else if(card.name.includes(subName) && cardList.map(path => card.path).includes(path))
        {
            let index = cardList.indexOf(domain0);
            const newList = enabledDomains.slice();
            newList.splice(index, 1);
            index = newList.indexOf(domain1);
            newList.splice(index, 1);
            setEnabledDomains([...newList]);
        }
    }
    const clickHandler = (e) =>
    {
        if(category === "Subclass")
        {
            SubclassDomains("beastbound", "Bone", "Sage");
            SubclassDomains("call of the brave", "Blade", "Bone");
            SubclassDomains("call of the slayer", "Bone", "Sage");
            SubclassDomains("divine wielder", "Splendor", "Valor");
            SubclassDomains("elemental origin", "Arcana", "Midnight");
            SubclassDomains("nightwalker", "Midnight", "Grace");
            SubclassDomains("primal origin", "Arcana", "Midnight");
            SubclassDomains("school of knowledge", "Codex", "Splendor");
            SubclassDomains("school of war", "Codex", "Splendor");
            SubclassDomains("stalwart", "Valor", "Blade");
            SubclassDomains("syndicate", "Midnight", "Grace");
            SubclassDomains("troubador", "Grace", "Codex");
            SubclassDomains("vengeance", "Valor", "Blade");
            SubclassDomains("warden of renewal", "Sage", "Arcana");
            SubclassDomains("warden of the elements", "Sage", "Arcana");
            SubclassDomains("wayfinder", "Bone", "Sage");
            SubclassDomains("warden of the elements", "Sage", "Arcana");
            SubclassDomains("winged sentinel", "Splendor", "Valor");
            SubclassDomains("wordsmith", "Grace", "Codex");
        }
        //if(!cardList.includes(path))
        if(!cardList.map(path => card.path).includes(path))
        {
            setCardList([...cardList, card]);
        }
        else
        {
            const mappedList = cardList.map(path => card.path);
            const index = mappedList.indexOf(path);
            const newList = mappedList.slice();
            newList.splice(index, 1);
            setCardList([...newList]);
        }
        

    }
    const hoverHandler = (e) =>
    {
        setIsClicked(true)
    }
    const leaveHandler = (e) =>
    {
        setIsClicked(false);
    }
    /*<div className="image">
                {isClicked && <img src={path} />}
            </div>*/
    return(
        <div>
            {searchShow && <button ref={refs.setReference} onMouseEnter={() => hoverHandler()} onMouseLeave={() => leaveHandler()} onClick={() => clickHandler()}>{card.name}</button>}
            {isOpen && (<div ref={refs.setFloating} style={floatingStyles}>
                <img src={`http://localhost:3001/img/category/${category}/name/${name}`} width="50%" height="50%"/>
            </div>)}
        </div>
    )
}