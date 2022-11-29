import { RainbowContainer, ColorBar } from "./StyledComponents";

export default function Rainbow(props) {
  return (
    <RainbowContainer left={props.left}>
      <ColorBar color={`#e91e63`} rotDeg={props.rotDeg}></ColorBar>
      <ColorBar color={`#f44336`} rotDeg={props.rotDeg}></ColorBar>
      <ColorBar color={`#cddc39`} rotDeg={props.rotDeg}></ColorBar>
      <ColorBar color={`green`} rotDeg={props.rotDeg}></ColorBar>
      <ColorBar color={`#360ef7`} rotDeg={props.rotDeg}></ColorBar>
    </RainbowContainer>
  )
}