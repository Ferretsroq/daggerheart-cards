import React, { useRef, useEffect } from 'react';
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
  
    let imageComponents = [];
    for(let imageIndex = 0; imageIndex < data.length; imageIndex++)
    {
      console.log(data[imageIndex]);
        imageComponents.push(<Image src={`http://localhost:3001/img/category/${data[imageIndex].category}/name/${data[imageIndex].name}`} style={styles.image}/>)
    }
    let rows = [];
    for(let imageIndex = 0; imageIndex < imageComponents.length; imageIndex++)
    {
        if(imageIndex%3 == 0)
        {
            rows.push(<View style={styles.section} key={imageIndex}>
                <Image src={`http://localhost:3001/img/category/${data[imageIndex].category}/name/${data[imageIndex].name}`} style={styles.image}/>
                {imageComponents.length > imageIndex+1 && <Image src={`http://localhost:3001/img/category/${data[imageIndex+1].category}/name/${data[imageIndex+1].name}`} style={styles.image}/>}
                {imageComponents.length > imageIndex+2 && <Image src={`http://localhost:3001/img/category/${data[imageIndex+2].category}/name/${data[imageIndex+2].name}`} style={styles.image}/>}
            </View>)
        }
    }
    return (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {rows}
    </Page>
  </Document>
    )
} 
    

export default PDFDocument;