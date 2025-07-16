import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    marginTop: "0.25in",
    marginBottom: "0.25in",
    marginLeft: "0.25in",
    marginRight: "0.25in",
  },
  section: {

    flexGrow: 0,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  /*image: {
    width: "201px",
    height: "264px"
  }*/
 /*image: {
  width: "30vw",
  height: "30vh",
  padding: "1.5vh"
 }*/
image: {
  width: "2.5in",
  height: "3.5in"
}
});


// Create Document Component
function PDFDocument({ data }) 
{
  
    //let imageComponents = [];
    //for(let imageIndex = 0; imageIndex < data.length; imageIndex++)
    //{
     //   imageComponents.push(<Image src={`http://localhost:3001/img/category/${data[imageIndex].category}/name/${data[imageIndex].name}`} style={styles.image}/>)
   // }
    const [rows, setRows] = useState([]);
    const [keyIndex, setKeyIndex] = useState(0);
    useEffect(() => {
      setKeyIndex(0);
      console.log('rows!!');
      console.log('Data');
      console.log(data);
      //setRows([]);
      for(let imageIndex = 0; imageIndex < data.length; imageIndex++)
      {
          if(imageIndex%3 == 0)
          {
              setRows([...rows, (<View style={styles.section} key={keyIndex}>
                  <Image src={`http://localhost:3001/img/category/${data[imageIndex].category}/name/${data[imageIndex].name}`} style={styles.image}/>
                  {data.length > imageIndex+1 && <Image src={`http://localhost:3001/img/category/${data[imageIndex+1].category}/name/${data[imageIndex+1].name}`} style={styles.image}/>}
                  {data.length > imageIndex+2 && <Image src={`http://localhost:3001/img/category/${data[imageIndex+2].category}/name/${data[imageIndex+2].name}`} style={styles.image}/>}
              </View>)]);
              setKeyIndex(keyIndex+1);
          }
      }
    }, [data]);
    /*for(let imageIndex = 0; imageIndex < imageComponents.length; imageIndex++)
    {
        if(imageIndex%3 == 0)
        {
            rows.push(<View style={styles.section} key={imageIndex}>
                <Image src={`http://localhost:3001/img/category/${data[imageIndex].category}/name/${data[imageIndex].name}`} style={styles.image}/>
                {imageComponents.length > imageIndex+1 && <Image src={`http://localhost:3001/img/category/${data[imageIndex+1].category}/name/${data[imageIndex+1].name}`} style={styles.image}/>}
                {imageComponents.length > imageIndex+2 && <Image src={`http://localhost:3001/img/category/${data[imageIndex+2].category}/name/${data[imageIndex+2].name}`} style={styles.image}/>}
            </View>)
        }
    }*/
    return (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {rows}
    </Page>
  </Document>
    )
} 
    

export default PDFDocument;