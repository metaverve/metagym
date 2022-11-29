import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { HomeContainer, StyledButon, StyledInput } from "./StyledComponents";
import Rainbow from "../../components/Rainbow";

function HomeScreen() {
  return (
    <>
      <HomeContainer>
        <Typography color={`#000`} fontSize={`20px`} fontWeight={700}>ACCESS UNLIMITED CLASSES & MORE</Typography>
        <Typography color={`#000`} fontSize={`18px`} textAlign={`center`}>Choose your own adventure by bundling what<br/>you want into one membership.</Typography>
        <Typography color={`#000`} fontSize={`14px`}>enter your email to create or restart your membership</Typography>
        <Box display={`flex`}>
          <StyledInput />
          <StyledButon size="small">Get Started</StyledButon>
        </Box>
      </HomeContainer>
      <Rainbow left={`40%`} rotDeg={`25deg`} />
    </>
  );
}

export default HomeScreen;
