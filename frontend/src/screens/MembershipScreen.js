import { Box } from "@mui/material";
import React from "react";
import Card from "../components/membership/Card";


function MemberShipScreen({ history }) {

  const CardData = [
    {
      url: 'images/airpods.jpg',
      title: 'Airpods',
      content: 'CEO',
      user: 'ceo@gmail.com'
    },
    {
      url: 'images/airpods.jpg',
      title: 'Airpods',
      content: 'CTO',
      user: 'ceo@gmail.com'
    },
    {
      url: 'images/airpods.jpg',
      title: 'Airpods',
      content: 'COO',
      user: 'ceo@gmail.com'
    },
    {
      url: 'images/airpods.jpg',
      title: 'Airpods',
      content: 'CMO',
      user: 'ceo@gmail.com'
    }
  ]

  return (
    <Box display={`flex`} style={{gap : `20px`}}>
      {CardData.map((row, index) => {
        return (
          <Card url={row.url} title={row.title} content={row.content} user={row.user} />
        )
      })}
    </Box>
  );
}

export default MemberShipScreen;
