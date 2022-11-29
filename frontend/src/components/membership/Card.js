import { Box, Button } from "@mui/material";
import styled from "styled-components";

const Card = (props) => {
  return (
    <Box width={`250px`} height={`300px`}>
      <CardContainer>
        <img src={props.url} alt=''/>
        <Box mt="20px" fontWeight={700}>{props.title}</Box>
        <Box mt="20px">{props.content}</Box>
        <Box mt="30px" color={`grey `}>{props.user}</Box>
      </CardContainer>
      <Button variant="contained" sx={{width : `100%`, marginTop : `20px`}}>Select</Button>
    </Box>
  )
}

const CardContainer = styled(Box)`
  display : flex ;
  flex-direction : column ;
  box-shadow: 2px 3px 6px 1px #888888;
  >img {
    width : 250px ;
    height : 150px ;
  }
  >div { 
    margin : 20px ;
    margin-top : 5px ;
    margin-bottom : 5px ;
  }

`

export default Card ;