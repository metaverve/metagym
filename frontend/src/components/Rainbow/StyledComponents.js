import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const ColorBar = styled(Box)`
  background : ${(props) => props.color};
  opacity : .2;
  width : 15px;
  height : 120vh;
  transform : rotate(${(props) => props.rotDeg});
`

export const RainbowContainer = styled(Box)`
  position : fixed;
  display: flex;
  gap: 10px;
  top: -10vh;
  left : ${(props) => props.left};
  z-index: 0;
`